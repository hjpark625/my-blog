# --- 빌드 스테이지 ---
FROM node:24-alpine AS builder

# 작업 디렉토리 설정
WORKDIR /app

# pnpm 설치
RUN npm install -g pnpm

# package.json 및 pnpm-lock.yaml 복사 및 종속성 설치
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# 나머지 소스 코드 복사
COPY . .

# Angular 애플리케이션 빌드
# 중요: 이 'pnpm build' 명령어는 'package.json'에서 '--deploy-url' 옵션을 포함하도록 수정되거나,
# CI/CD 파이프라인에서 직접 '--deploy-url'을 추가하여 호출되어야 합니다.
# 예: pnpm build --configuration production --deploy-url https://[CloudFront 주소]/
RUN pnpm build


# --- 런타임 스테이지 ---
FROM node:24-alpine AS runner

# 작업 디렉토리 설정
WORKDIR /app

# 빌드 스테이지에서 필요한 파일만 복사
# 클라이언트 측 정적 파일 (S3/CloudFront로 배포될 예정)
COPY --from=builder /app/dist/my-blog/browser ./dist/my-blog/browser
# 서버 측 렌더링 번들 (Node.js 서버가 실행할 코드)
COPY --from=builder /app/dist/my-blog/server ./dist/my-blog/server
# package.json (서버 측 종속성 확인용)
COPY package.json ./

# 프로덕션 종속성만 설치 (개발 종속성 제외)
# Note: Angular SSR 애플리케이션은 런타임에 필요한 종속성이 거의 없지만,
# express 등 필요한 라이브러리가 있을 수 있으므로 package.json을 복사하고 pnpm install --prod를 실행합니다.
RUN pnpm install --prod --frozen-lockfile

# 애플리케이션이 수신할 포트 지정 (Angular SSR 기본 포트)
EXPOSE 4000

# 서버 애플리케이션 실행 명령어
# server.mjs 파일은 package.json의 "serve:ssr:my-blog" 스크립트에서 확인되었습니다.
CMD [ "node", "dist/my-blog/server/server.mjs" ]

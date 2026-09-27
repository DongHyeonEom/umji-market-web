# 엄지마켓 Web

React 기반 WebView 화면

## 회원 진입 흐름

1. 앱 진입 시 Refresh Token으로 세션 갱신
2. 세션이 없으면 휴대폰 번호 인증 화면 표시
3. 기존 회원의 동의·활성화 상태에 따라 개인정보 동의 또는 서비스 홈으로 이동
4. 신규 업체는 동의 후 업체 정보 입력 화면으로 이동
5. `PENDING_REVIEW`, `SUSPENDED`, `WITHDRAWN` 상태는 안내 화면 표시

Access Token은 메모리에만 보관하고 401 또는 앱 재진입 시 Refresh API를 호출함. 전체 흐름: `E:\buyeong_dev\umji-market\SERVICE_FLOW.md`

// 결제 프로세스

//      관련 개념

//          카드사
//              실제 결제를 처리하는 카드 회사
//              대표적인 회사: 신한카드, 국민카드, ...

//          PG사
//              Payment Gateway
//              결제 처리를 도와주는 시스템을 제공하는 회사
//              PG사마다 결제 처리 코드가 달라 요청 방법도 다름
//              대표적인 회사: Nice, NHN, ...

//          솔루션사
//              결제 기능을 해결하기 위한 프로그램을 제공하는 회사
//              각기 다른 PG사의 결제모듈 요청을 통합으로 처리해주는 회사
//              대표적인 회사: 아임포트(포트원), 부트페이, ...


//      결제 프로세스 만들 때 유의할 사항

//          실결제연동
//              결제 프로세스 과정을 캡쳐해 PPT로 만들어 PG사에게 전달
//              PG사에서 각 카드사에게 PPT 전달
//              카드사에서 PPT를 보고 결제 프로세스 접속 테스트 및 '결제심사'

//          결제심사
//              도박 사이트가 아닌지, 경매 사이트가 아닌지 검사
//              금액을 직접 입력해서 결제하는 방식이 아닌지 검사(경매사이트)

//          결제일정
//              솔루션사, PG사와 계약하는 데 1주일 정도 소요
//              카드사 심사를 받은 데 2주일 정도 소요
//              => 개발자는 시간 계산을 잘하자!


//      결제 프로세스 흐름

//          1. 브라우저에서 결제 정보 입력 및 결제 버튼 클릭

//          2. 브라우저가 솔루션사에게 결제정보 전달
//          3. 솔루션사가 PG사에게 결제정보 전달
//          4. PG사가 카드사에게 결제정보 전달

//          5. 카드사에서 결제 처리

//          6. 카드사가 PG사에게 결제결과 전달
//          7. PG사가 솔루션사에게 결제결과 전달
//          8. 솔루션사가 브라우저에게 결제결과 전달

//          9. 브라우저가 백엔드에게 createPayment API 요청으로 결제결과 전달
//          10. 백엔드가 결제결과를 생성해 DB에 저장
//          11. 백엔드가 브라우저에게 결제결과 저장 결과 응답
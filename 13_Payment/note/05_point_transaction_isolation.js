// Isolation 4단계 구현

//      * 3단계는 안쓰나요?

//          3단계의 Phantom Read 는 MySQL에서는 기본적으로 차단해줌
//          따라서 2단계 Read Committed 까지만 구현하고 4단계로 넘어가도됨

//      4단계 : SERIALIZABLE

//          SERIALIZABLE 개념

//              데이터 수정 트랜잭션이 실행중인 동안 동일한 데이터를 다른 트랜잭션에서 수정하면
//               두 트랜잭션 중 먼저 실행된 쪽의 수정이 덮어써질 수 있음

//              예시)
//                  데이터를 A, B 트랜잭션이 수정
//                  1) A 트랜잭션 데이터 조회
//                  2) B 트랜잭션 데이터 조회
//                  3) A 트랜잭션이 조회한 데이터를 a 로 수정
//                  4) B 트랜잭션이 조회한 데이터를 b 로 수정
//                  => 데이터가 b 로 수정됨, A 트랜잭션의 수정 결과가 덮어써짐

//              한 트랜잭션이 실행중인 동안 DB에 락을 걸어 다른 트랜잭션이 DB에 접근하지 못하게 하는 것

//              성능 측면에서는 동시 처리성능이 가장 낮으며 가장 단순한 격리 수준이지만 가장 엄격
//              효율적인 측면에서 손해를 보기 때문에 대부분의 데이터베이스에서 사용 안함


//          DB 락의 종류

//              낙관적락
//              : 위와 같은 문제 상황이 발생하지 않을 것이라 가정하고 따로 처리하지 않는 것

//              비관적락
//              : 위와 같은 문제 상황이 분명이 발생할 것이라 가정하고 안전하게 처리하는 것
//                공유락과 베타락이 있음


//          비관적락의 종류

//              공유락 (Shared Lock, S-Lock)
//              : 읽기전용 쓰기잠금 pessimistic_read
//                테이블을 읽기 것만 가능하게 락을 걸어둠

//              베타락 (Exclusive Lock, X-Lock)
//              : 읽기쓰기 모두잠금 pessimistic_write
//                테이블을 접근조차 안되게 락을 걸어둠


//          테이블락과 로우락

//              테이블락
//              : 테이블 전체를 조회하는 경우 테이블 전체에 거는 락
//                다른 트랜잭션에서 테이블 전체에 접근 불가능
//                조회 조건을 주지 않으면 자동으로 테이블락이 걸림
`                   const payment = await queryRunner.manager.find(Payment, {
                      lock: { mode: 'pessimistic_write' },
                    });
`
//              로우락
//              : 특정 로우를 조회하는 경우 특정 로우에만 락 걸기
//                다른 트랜잭션에서 특정 로우를 제외한 로우에는 접근 가능
//                where절로 조회 조건을 걸면 자동으로 로우락이 걸림
`                   const payment = await queryRunner.manager.find(Payment, {
                      lock: { mode: 'pessimistic_write' },
                      where: { id: '0edb1d43-68d5-4225-a992-8b24b3c06972' },
                    });
`

//          로우락이 작동하지 않는 경우

//              * 테이블락을 걸면 테이블조회, 로우조회 둘 다 안됨 (락 작동)
//              * 로우락을 걸면 로우조회는 막히지만, 테이블 전체 조회는 안막아짐 (로우락 미작동)
//              => 로우락을 걸고 테이블을 조회하는 코드는 지양할 것


//          조인한 테이블의 락

//              조인된 테이블에 로우락을 걸면 조인당한 테이블의 로우에도 로우락이 걸림


//          SELECT ~~~ FOR UPDATE 문

//              락을 걸어놓고 테이블을 조회할 때는 'SELECT ~~~' 문이 
//               'SELECT ~~~ FOR UPDATE'문으로 바뀜 : 업데이트를 위한 셀렉트

//              => 락이 걸린 범위에 다른 트랜잭션이 접근하지 못함


//      4단계 구현 실습은 강의자료 참고

//          PointTransactionService의 create() 서비스 함수에 락 걸어주기
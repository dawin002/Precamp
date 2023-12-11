// 스코프(scope)

//      변수 참조의 유효 범위
//      전역 스코프 & 지역 스코프

// 1. 전역 스코프(global scope)

//      js 파일의 전체 부분
//      전역 스코프의 변수 -> 지역 스코프에서 참조 가능

// 2. 지역 스코프(local scope)

//      특정 블럭 내부의 부분
//      지역 스코프의 변수 -> 전역 스코프에서 참조 불가능
//          예외) var 키워드
//          : var 키워드로 선언한 변수는 전역 스코프에서 참조됨
//            참조 안되는게 더 바람직한거라서 var 사용 지양

//      1) 함수 레벨 스코프
//          함수의 중괄호 내부

//      2) 블럭 레벨 스코프
//          if문, for문 등의 조건식, 실행식 내부

// var 키워드의 스코프 문제점

//      1) 지역 전역 스코프의 구분이 없음
//      2) 변수의 재선언 가능
//      -> 다음과 같은 상황 발생

var i = 100
console.log("i in global scope : ", i)

for (var i = 0; i < 3; i += 1) {
    console.log("i in local scope : ", i)
}

console.log("i in global scope : ", i)


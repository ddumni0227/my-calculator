let firstOperand = '';
let secondOperand = '';
let operator = null;

const answers = document.querySelector('.answer');

let numbers = document.querySelectorAll('.number');

//숫자
numbers.forEach((num) => {
  num.addEventListener('click', function (e) {
    if (answers.textContent === '0' || operatorClicked) {
      // 초기값이거나 연산자 클릭 후 새로운 입력일 때
      answers.textContent = e.target.textContent;
      operatorClicked = false; // 새로운 숫자 입력 후 상태 해제
    } else {
      // 기존 값 뒤에 숫자 추가
      answers.textContent += e.target.textContent;
    }
  });
});

//소수점
const point = document.querySelector('.point');
point.addEventListener('click', function (e) {
  if (!answers.textContent.includes('.')) {
    //해당 문자열에 .이 해당되어있지않을때
    answers.textContent += '.';
  }
});

//클리어
const clearBtn = document.querySelector('.clear');
clearBtn.addEventListener('click', function (e) {
  answers.textContent = '0';
  firstOperand = null;
  secondOperand = null;
  operator = null;
  operatorClicked = false;
});

let operatorClicked = false;

let operators = document.querySelectorAll('.operator');
//연산자
operators.forEach((ope) => {
  ope.addEventListener('click', function (e) {
    if (firstOperand === null) {
      // 첫 번째 피연산자 저장
      firstOperand = parseFloat(answers.textContent);
    } else if (!operatorClicked) {
      // 연속 계산 수행
      secondOperand = parseFloat(answers.textContent);
      firstOperand = calculate(firstOperand, operator, secondOperand);
      answers.textContent = firstOperand; // 중간 결과 표시
    }
    console.log(parseFloat(answers.textContent));
    console.log(e.target.textContent);
    operator = e.target.textContent;
    operatorClicked = true;
  });
});

let functions = document.querySelectorAll('.function');
functions.forEach((func) => {
  func.addEventListener('click', function (e) {
    console.log(e.target.textContent);
  });
});

//=버튼
const resultBtn = document.querySelector('.result');
resultBtn.addEventListener('click', function () {
  if (firstOperand !== null && operator !== null) {
    // 두 번째 피연산자 저장
    secondOperand = parseFloat(answers.textContent);

    // 계산 수행 및 결과 표시
    const result = calculate(firstOperand, operator, secondOperand);
    answers.textContent = result;

    // 다음 계산을 위해 결과를 첫 번째 피연산자로 설정
    firstOperand = result;
    secondOperand = null;
    operator = null;
  }
});

//연산식
function calculate(firstOperand, op, secondOperand) {
  switch (op) {
    case '+':
      return firstOperand + secondOperand;
    case '-':
      return firstOperand - secondOperand;
    case '*':
      return firstOperand * secondOperand;
    case '/':
      return secondOperand !== 0 ? firstOperand / secondOperand : 'Error'; // 0으로 나누기 방지
    default:
      return firstOperand;
  }
}
console.log('First Operand:', firstOperand);
console.log('Second Operand:', secondOperand);
console.log('Operator:', operator);

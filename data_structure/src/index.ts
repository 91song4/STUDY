import { Stack } from "./stack";

/** 양의 정수를 입력 받아 팩토리얼 계산해주는 함수
 * @param num 양의 정수
 * @return result
 */
export function factorial(num: number): number {
  if (num <= 1) return 1;

  return num * factorial(num - 1);
}

/** 스택 응용: 괄호 검사
 * @ 조건 1: 왼쪽 괄호의 개수와 오른쪽 괄호의 개수가 같아야한다.
 * @ 조건 2: 같은 종류의 괄호에서 왼쪽 괄호는 오른쪽 괄호보다 먼저 나와야한다.
 * @ 조건 3: 서로 다른 종류의 왼쪽 괄호와 오른쪽 괄호 쌍은 서로를 교차하면 안 된다.
 * @return true | false
 */
function 괄호체크(szData: string): boolean {
  const stack = new Stack(100);

  for (let i = 0; i < szData.length; ++i) {
    const isOpenBracket =
      szData[i] === "[" || szData[i] === "{" || szData[i] === "(";
    const isCloseBracket =
      szData[i] === "]" || szData[i] === "}" || szData[i] === ")";

    if (isOpenBracket) {
      stack.push(szData[i]);
    } else if (isCloseBracket) {
      try {
        const openBracket = stack.pop();
        if (szData[i] === "]") {
          if (openBracket !== "[") {
            return false;
          }
        }
        if (szData[i] === "}") {
          if (openBracket !== "{") {
            return false;
          }
        }
        if (szData[i] === ")") {
          if (openBracket !== "(") {
            return false;
          }
        }
      } catch (err) {
        return false;
      }
    }
  }

  if (!stack.isEmpty()) {
    return false;
  }
  return true;
}
console.log(괄호체크("{ A[(i+l)]=Θ; }"));
console.log(괄호체크("if((1==0) && (j==θ)"));
console.log(괄호체크("A[(i+1])=0;"));
console.log(괄호체크("{(a÷b)*k[2+3*n]}"));
console.log(괄호체크("{[(2+10)tu]/3 ]"));
console.log("Hello World!!");

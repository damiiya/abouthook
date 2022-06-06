// Hook은 리액트 16.8 version 부터 추가됨
// React Function 안에서 사용 가능
// 컴포넌트 최상위에서만 호출 가능(반복문X 중첩문X)
// useState, useEffect, useCallback, useRef
import React from "react";

export const One = () => {
  // const [변수명, 바꿀변수명] = React.useState(기본값)
  const [someValue, setValue] = React.useState("HI");

  // useRef는 도플갱어 박스
  // 어떤 값을 넣어주면 그 값으로 초기화된 변경 가능한 ref 객체를 반환함
  const input_ref = React.useRef(null);

  // 함수형 컴포넌트의 라이프사이클을 다루는 useEffect
  // 콜백함수 사용({컴포넌트가 화면에 렌더링할 때 실행할 함수},[dA])
  // dA 의존성 배열, useEffect의 렌더링 함수가 실행될 조건을 써줌
  React.useEffect(() => {
    console.log(someValue);
  }, [someValue]);

  // useEffect는 한 컴포넌트 안에서 여러번 쓸 수 있음
  // useEffect 실행 함수 안에 return문을 써줄 수 있음 > 목적은 클린업
  React.useEffect(() => {
    console.log("ImHERE");
    return () => {};
  }, []);

  const logger = React.useCallback(() => {
    console.log("memoization!!");
  }, []);

  return (
    <div>
      <p>{someValue}</p>
      <button
        onClick={() => {
          setValue("HELLO");
        }}
      >
        Change!!
      </button>

      <Two logger={logger} />

      <button
        onClick={() => {
          console.log(input_ref.current.value);
        }}
      >
        input 값 보기
      </button>

      <div>
        <input ref={input_ref} />
      </div>
    </div>
  );
};

// useCallback은 메모이제이션, 메모리 어딘가에 저장해두고 두고두고 써먹는 함수
// 주로 자식 컴포넌트에게 전달해주는 콜백 함수를 메모이제이션할 때 씀
export const Two = ({ logger }) => {
  return <button onClick={logger}>콘솔남기기</button>;
};

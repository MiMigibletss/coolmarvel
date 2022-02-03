![MIMI](https://user-images.githubusercontent.com/88940298/150443569-03c1dfc1-5d17-48bb-8b42-36308d964076.png)


# MIMI 
- 블록체인의 블록 채굴 개념(Pow) 학습을 위한 채굴 체험 웹페이지



##
## 4차 프로젝트 :1월 6일 ~ 1월 21일 (조기발표 1월 18일)

p.s. 현재 서버를 닫은 관계로 실행이 되지 않습니다

---   

👨‍👩‍👦‍👦Member.  MIMI 의 팀원들입니다


한경현(kyunghyun Han):[깃허브](https://github.com/kyunghyunHan).     
이성재(SeongJae Lee):[깃허브](https://github.com/seongjae-Leee).  
이성현(SeongHyun Lee):[깃허브](https://github.com/coolmarvel)

**기간** : 1월 6일 ~ 1월 21일 (조기발표 1월 18일)

**전반적인 프로젝트 진행절차**
- ~1/10 : 디렉토리 구조 나누기. 서버 빌드
- 1/11 : 기능 구현 확인(지갑 생성, 거래내역, 블록 생성, 유효성 검사)
- 1/12 : 리액트 컴포넌트 구성
- 1/13 : 리액트 컴포넌트 상태 변환
- 1/14 : DB
- 1/15 : p2p
- 1/16 : 곱창구매샵 구현
- 1/17 : 임의로 코인 구현

---------------------------------------------------------------------------------------------------------------------------------------
- 1/5 ~ 1/9  : 디렉토리 구조 설정 및 빌드 과정 최종 논의
- ~ 1/13  : server 및 지갑 생성 기능 구현
- ~ 1/15  : 블록 채굴 및 시각화
- ~ 1/16  : 부가적인 기능 추가 및 통합
- ~ 1/19  : 최종결과물 피드백 및 발표 준비




# 목차
[1.개요](#개요)

[2.목적](#목적)

- 기존 서비스와의 차별점

[3.전체 소스 코드](#전체-소스-코드-click)

[4.사용한 기술](#사용한-기술)

[5.주요 기능](#주요-기능)

[6.발생한 이슈 & 해결 방법](#발생한-이슈--해결-방법)

[7.상세 설명](#상세-설명)

 - DB 구조 (ERD)

 - 전체 흐름도
 
 - 프로젝트 설명 PPT

***

### 개요

- 블록체인~~~ 
  

### 목적

> 블록체인 

> 블록체인

- **기존 서비스와의 차별점**

   - nosql mysql 의 각각의 장점을 부각시키고 단점을 보안
   - REDUX 활용 AUTH 진행
   - 커플 연결 서비스 진행 (관계쿼리)
   

### 👬 전체 소스 코드 [클라이언트](https://github.com/MiMigibletss/MIMI/tree/main/src)  or [서버](https://github.com/MiMigibletss/MIMI/tree/main/server1)


### 🛠 사용한 기술

- 웹 화면 구성 : `REACT` 
- DB 액션 처리 : `Sequelize` `mongoose`
- DBMS : `MySQL`
- 개발 Tool :`PostMan` `Visual Studio Code``github`
- AWS 배포 : `RDS`
- 로그인 구현 : `UBUNTU`
- 프레임워크 : `NodeJs` `REACT`
- 프로젝트 관리 Tool : `Google Drive` `GitHub` `notion`

### 🔎  깃 브랜치 활용

코드 병합시 오류를 최소화 하기위해 깃브런치 


✔ main - 개발 완료하고 최종 코드 올리는 브랜치


# 🔥발생한 이슈 & 해결 방법

### "코인개념 도입 후 거래(결졔) 서비스 만들기"

[상황]  
![image](https://user-images.githubusercontent.com/89692626/150668594-70d4ec3f-9f8f-42e8-a8c4-e32a3bdd2b57.png)

[문제] 

블록체인을 DB에 담는 과정에서 블록의 모든 정보는 하나의 컬럼에 JSON 형식으로 넣고

코인은 그 옆에 다른 컬럼에 넣어서 채굴에 대한 보상으로 제공하여 해당 노드가 후에 코인으로 서비스를 이요하면

그만큼의 코인을 차감하는 방식을 택하려고 했는데, 차감을 하자니 DB에서 블록이 다시 쌓이게 되고 

결국 블록체인의 개념(불가침성)이 훼손되는 문제가 발생했다.

[해결] 

결국 아직 Dapp이나 리워드로써 코인의 개념이 잡하지 않은 상태에서, 그리고 DB에 넣는다는 것부터가

블록체인의 개념과 맞지 않아서 코인을 지갑이 아닌 DB에 넣어서 서비스를 제공하기는 무리였다.

추후에 지갑과 코인의 개념을 더 공부하고서 재시도할 예정이다.

### "CORS 정책에 의한 에러"

[상황]  
![콜스 에러](https://user-images.githubusercontent.com/90792916/143545407-1d5a53ca-7a6b-442d-94d9-72ea41138cdf.png)  

[문제] 

서버는 포트가 5000 번이고,

클라이언트는 포트가 3000 번으로 다른데 서로 주고 받으려고 하면,

CORS 정책에 의해 막혀버린다.

[해결] 

npm i http-proxy-middleware 모듈을 설치하고
```
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000',  //  노드 서버가 5000 번이므로 target 도 같게한다.
      changeOrigin: true,
    })
  );
};
```
프록시 서버를 이용하여 에러를 해결했다.


### "./src 디렉토리 밖에서 함수호출"

[상황]  
![src에러](https://user-images.githubusercontent.com/89625961/150447480-5ae04475-f466-4be7-8b50-f35b1c84ade5.png)


[문제] 

React 자체적으로 src 디렉토리 밖에서 이미지든 함수든 모듈을 import 할 때 안되게끔 default 되어있었다.

encryptyion.js에서 getPublicKey(지갑주소)를 받아 와야하는데 axios로 onClick을 통해서는 불러올 수 있지만 그 값 자체를 불러올 수는 없었다.

[해결] 

해결방법은 당연하게도 src 디렉토리 안에 넣으면 해결되는 문제이지만 우리가 이용할 함수가 실행할때마다 출력값이 바뀌는 함수여서,

src로 옮길 시 server 디렉토리 안에 있는 지갑주소와 값이 달라져 또 다른 이슈가 발생하게 된다.

아쉽게도 그 값 자체를 렌더링 할때마다 불러오는 것은 실패하였지만 axios를 통해 값을 불러오는 것으로 아쉽게 마무리하게 되었다.


### "react-redux 사용시 Invalid hook call at Provider"

[상황]  
![redux에러](https://user-images.githubusercontent.com/89625961/150450314-1ff0e027-9bce-4ba4-92eb-42d4ee13c1e7.png)


[문제] 

redux를 사용하기 위해서 적용하던중,

ReactDOM.render 부분에 <Provider /> 를 추가했을 때, 위와 같은 에러가 떴다.

<Provider store={store}> , </Provider> 부분을 빼고 실행하면 정상적으로 작동하는 상황이었다.

[해결] 

해당 해결법이 적용되는 경우는

```
npm ls react
```
를 했을 때, 

두개이상의 버젼의 리엑트가 존재한다면(나의 경우는 17.0.2, 16.x.x) 

```
npm update
```
를 하면 된다. 

그 이후 다시 npm ls react를 하면 모두 다 같은 버젼의 리액트로 표시되고 정상적으로 페이지가 작동했다.

우리 같은 경우는 위와 같은 방법으로 해결이 되었지만, 2가지 방법이 더 있다고 한다.



1. Rule of Hooks을 break해서 (Stack Overflow에서 제일 첫번쨰 답변)

제안하는 바 :

```
    const AppWrapper = ({ children }) => {
        const store = createStore(reducer);

        return (<Provider store={store}>{children}</Provider>);
    }
```
방법으로 Redux Provider를 Wrap하라고 제안했다.



2. Duplicated React (나의 경우가 해당)


제안하는 바 : 


1. npm ls react -> 리액트 버젼 여러개? -> npm update


2. npm uninstall 한 후, 다시 install



### 프로젝트 기획안
[구글 기확안/회의록 파일](https://drive.google.com/drive/folders/16mA6-jiUT15Sxzz4jaZQ-ap9a9bkzwb2)   




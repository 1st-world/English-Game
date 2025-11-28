# English Game: Wordle

이 프로젝트는 영단어 추측 게임 **Wordle**을 구현한 웹 서비스입니다.

## 프로젝트 개요

**Wordle**은 주어진 6번의 기회 안에 특정 글자 수의 단어를 추측하는 게임입니다. 각 추측에 대해 단어의 위치와 정확성을 색상으로 피드백하여 사용자가 정답을 맞힐 수 있게끔 하며, 라운드가 종료되면 정답 단어와 함께 그 사전적 의미를 함께 제공하여 교육적 효과를 더했습니다.

## 규칙

- 무작위로 선택된 영단어를 6번의 기회 안에 추측해야 합니다.

- 추측한 단어의 정확성을 글자마다 색상으로 표시:
  - **녹색**: 글자와 위치가 모두 정확합니다.
  - **황색**: 단어에 포함되지만 위치가 다른 글자입니다.
  - **회색**: 단어에 포함되지 않는 글자입니다.

    ![Sample Image](./sample_play_result.png)

## 실행 방법

이 프로젝트는 로컬 서버 또는 GitHub Pages를 통해 웹 브라우저에서 바로 실행할 수 있습니다.
   
- [**GitHub Pages에서 바로 플레이하기**](https://1st-world.github.io/English-Game/)
    - 가상 키보드를 지원하여 모바일 환경에서도 플레이 가능합니다.

- **로컬에서 실행하기**
    1. 이 저장소를 클론하거나 다운로드합니다.
    2. 프로젝트 폴더에 `words_alpha_sorted.txt` 파일이 존재하는지 확인합니다. (오프라인 모드 및 검증용)
    3. 브라우저 보안 정책(CORS)으로 인해 단순 파일 열기가 아닌, 로컬 웹 서버를 통해 실행해야 합니다.
        - VS Code의 'Live Server' 확장 프로그램 사용 권장
        - 또는 Python이 설치된 경우: `python -m http.server 8000`

## 데이터 소스 및 API

안정적인 서비스 제공을 위해 이원화된 데이터 소스를 사용합니다.

- **무작위 단어 선택**: [Random Word Generator API](https://random-word-api.vercel.app/)
    - API 호출 실패 시 로컬 데이터(`words_alpha_sorted.txt`)에서 무작위 추출

- **단어 의미 검색**: [Free Dictionary API](https://dictionaryapi.dev/)
    - 게임 종료 후 정답 단어의 뜻 제공
    - 이 기능은 오프라인 환경에서는 지원하지 않습니다.

- **로컬 데이터**의 원본은 [dwyl / English-words](https://github.com/dwyl/english-words) 프로젝트에서 가져왔습니다.
    - 입력 단어 유효성 검증 및 API 폴백(Fallback) 용도
    - 단어별 사용 빈도 구분이 없는 관계로 무작위 추출 시 난이도 조절이 어렵습니다.
document.addEventListener('DOMContentLoaded', async () => {
  // 테이블에 들어갈 데이터를 불러온다.
  const response = await axios.get('http://localhost:3000/cust');
  const custs = response.data;

  // 데이터 삽입 이벤트 대기
  document.getElementById('insert-btn').addEventListener('click', insertCust);

  // 테이블 보이기
  viewTable(custs);
});

/*
STEP_01 외부에서 접근 가능한 웹서버 구축 ( DB 연동 필요, 서버 형태는 상관없음 )
STEP_02 아래 API 주소를 호출하여 Data 영역을 파싱 ( Data 구성 확인 )
http://secuprime.com/recruit/202308_testdata.php
STEP_03 적절한 데이터베이스, 테이블, 필드 구성
STEP_04 웹 페이지에 버튼 생성 ( 동작 : DB에 기존 Data 삭제 후 신규 파싱 Data 저장 )
STEP_05 DB에 저장된 내용을 웹 페이지에 그리드(테이블) 구성 후 Data 표출
( 그리드 종류, 형태는 상관없음, page 구성 상관없음 )
STEP_06 각 로우에 대한 수정, 삭제 UI 및 동작 구성 ( UI 형태는 상관없음 )
*/

// 데이터를 이용하여 테이블 구성
function viewTable(custs) {
  for (cust of custs) {
    const custTable = document.getElementById('cust-table');

    const tr = document.createElement('tr');
    tr.id = cust.guestCode;

    for (item in cust) {
      const td = document.createElement('td');
      td.textContent = cust[item];
      tr.appendChild(td);
    }

    appendButton(tr);

    custTable.appendChild(tr);
  }
}

// 수정과 삭제버튼 만들기
function appendButton(tr) {
  const editBtn = document.createElement('button');
  editBtn.textContent = '수정';
  editBtn.id = cust.guestCode;

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '삭제';
  deleteBtn.id = cust.guestCode;

  tr.appendChild(editBtn);
  tr.appendChild(deleteBtn);

  // 로우 수정, 삭제 이벤트 대기
  editBtn.addEventListener('click', editCust);
  deleteBtn.addEventListener('click', deleteCust);
}

// 해당 로우 수정
function editCust() {
  try {
    let custs = [];

    // 각 필드의 속성을 이용하여 편집가능한 상태로 만들기
    for (let i = 1; i < 6; ++i) {
      const td = document.getElementById(this.id).childNodes[i];

      td.contentEditable = 'true';
      custs.push(td);
    }

    // 버튼 이름 변경
    this.textContent = '확인';

    this.addEventListener('click', async () => {
      const [guestName, guestBirth, guestHp, guestAddr, guestMail] = custs.map(
        (cust) => {
          cust.contentEditable = 'false';
          return cust.textContent;
        },
      );

      const body = {
        guestName,
        guestBirth,
        guestHp,
        guestAddr,
        guestMail,
      };

      // 데이터 수정 API 호출
      await axios.put(`http://localhost:3000/cust/${this.id}`, body);

      // 페이지 새로고침
      window.location.reload();
    });
  } catch (err) {
    console.log(err);
  }
}

// 해당 로우 삭제
async function deleteCust() {
  try {
    // 데이터 삭제 API 호출
    await axios.delete(`http://localhost:3000/cust/${this.id}`);

    // 페이지 새로고침
    window.location.reload();
  } catch (err) {
    console.log(err);
  }
}

// 데이터 삽입
async function insertCust() {
  const pathInput = document.getElementById('path-input');

  try {
    // input에 입력된 path로 데이터 삽입 API 호출
    await axios.post('http://localhost:3000/cust', {
      path: pathInput.value,
    });
  } catch (err) {
    alert('데이터를 읽을 수 없습니다.');
  }

  // 페이지 새로고침
  window.location.reload();
}

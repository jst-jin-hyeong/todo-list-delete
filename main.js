// 유저가 값을 입력한다.
// + 버튼을 클릭하면, 할일이 추가된다.
// delete 버튼을 누르면 할일이 삭제된다.
// check 버튼을 누르면 할일이 끝나면서 밑줄이 간다.
////--1. 체크버튼을 클릭하는 순간 true false
////--2. true면 끝난 걸로 간주하고 밑줄 보여주기
////--3. false 면 안 끝난 걸로 간주하고 그대로
// 진행중 끝남 탭을 누르면, 언더바가 이동한다.
// 끝남탭은, 끝난 아이탬만, 진행중탭은 진행중 아이템만
// 전체탭을 누르면 다시 전체 아이템으로 돌아옴

// 유저가 값을 입력한다.
let taskInput = document.getElementById('task-input');
console.log(taskInput);

// + 버튼을 클릭하면, 할일이 추가된다.
// let addButton = document.getElementById('add-button');
// addButton.addEventListener('click', addTask);
let tabs = document.querySelectorAll('.task-tabs div');
let taskList = [];
let mode = 'all';
let filterList = [];
let doneList = [];

console.log(tabs);

const icon = document.createElement('i');

icon.innerHTML = '<i class="far fa-trash-alt"></i>';

for (let i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener('click', function (event) {
    filter(event);
  });
}
function addTask(value) {
  // let taskContent = taskInput.value;
  let task = {
    id: randomIDGenerate(),
    taskContent: value,
    isComplete: false,
  };
  taskList.push(task);
  console.log('clicked');
  console.log(task);
  taskInput.value = '';
  filter();
}

// function enterkey() {
//   if (window.event.keyCode == 13 && taskInput.value != '') {
//     addTask();
//   }
// }

document
  .querySelector('#taskForm')
  .addEventListener('submit', function (event) {
    event.preventDefault();
    const value = taskInput.value;

    if (!value) {
      return;
    }
    addTask(value);
  });

function render() {
  let list = [];
  if (mode === 'all') {
    list = taskList;
  } else if (mode === 'ongoing') {
    list = filterList;
  } else if (mode === 'done') {
    list = filterList;
  }
  let resultHTML = '';
  for (let i = 0; i < list.length; i++) {
    if (!!list[i].isComplete) {
      resultHTML += `<div class="task">
    <div class="task-done">${list[i].taskContent}</div>

        <div>
            <button onClick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-check"></i></button>
            <button onClick="deleteTask('${list[i].id}')"><i class="fa-solid fa-xmark"></i></button>
        </div>`;
    } else {
      resultHTML += `<div class="task">
    <div>${list[i].taskContent}</div>

        <div>

            <button onClick="toggleComplete('${list[i].id}')"><i class="fa-regular fa-comment"></i></i></button>

            <button onClick="deleteTask('${list[i].id}')"><i class="fa-solid fa-xmark"></i></button>
        </div>`;
    }
  }
  document.getElementById('task-board').innerHTML = resultHTML;
}

function toggleComplete(id) {
  // console.log('check됬음');  //<-- innerHTML을 통해 만들어진 버튼에  클릭이벤트를 붙이는 게 잘 되었는지 테스트
  console.log('id: ', id);
  for (let i of taskList) {
    if (i.id == id) {
      console.log(i.taskContent);
      console.log('체크하기 전: ', i.isComplete);
      i.isComplete = !i.isComplete;
      console.log('체크한 후: ', i.isComplete);
      break;
    }
  }
  filter();
}

function deleteTask(id) {
  console.log('id: ', id);
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      console.log('삭제할 대상: ', taskList[i].taskContent);
      taskList.splice(i, 1);
      break;
    }
  }
  filter();
}

function filter(event) {
  if (event) {
    mode = event.target.id;
  }
  filterList = [];
  doneList = [];
  if (mode == 'all') {
    //전체 리스트를 보여주기
    console.log('all 이다');
  } else if (mode == 'ongoing') {
    //
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === false) {
        filterList.push(taskList[i]);
      }
    }
    console.log('ongoing 이다');
  } else if (mode == 'done') {
    console.log('done 이다');
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === true) {
        filterList.push(taskList[i]);
      }
    }
  }
  render();
  console.log('진행중: ', filterList, ', 끝남: ', doneList);
}

function randomIDGenerate() {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return '_' + Math.random().toString(36).substr(2, 9);
}

// function horizontalIndicator(e) {

// }


// Lấy dữ liệu từ form
export let getForm = () => {
  let task = document.getElementById("newTask").value.trim();
  return {
    task,
  };
};

// Render ra giao diện
export let renderTaskList = (list, idTask) => {
  let contentHTML = "";

  list.forEach((item) => {
    let content = `
    <li>
        <span>${item.task}</span>
        <div class="buttons">
            <button onclick="removeTask(${item.id})" class="remove">
                <i class="fa-solid fa-trash-can"></i>
            </button>
            <button onclick="checkTask(${item.id})" class="complete">
                <i class="fa-regular fa-circle-check"></i>
            </button>
        </div>
    </li>
    `;
    contentHTML += content;
  });

  document.getElementById(idTask).innerHTML = contentHTML;
};

// Tìm kiếm vị trí
export let searchLocation = (arr, id) => {
  return arr.findIndex((item) => {
    return item.id == id;
  });
};

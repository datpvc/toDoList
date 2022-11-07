import {
  getForm,
  renderTaskList,
  searchLocation,
} from "./controller/todoListController.js";

const BASE_URL = "https://62f8b76ae0564480352bf5ac.mockapi.io";

let todoList = [];

// Loading
let onLoading = () => {
  document.getElementById("page__loader").style.display = "flex";
};

let offLoading = () => {
  document.getElementById("page__loader").style.display = "none";
};

// Render dữ liệu API
let renderService = () => {
  onLoading();
  axios({
    url: `${BASE_URL}/todoList`,
    method: "GET",
  })
    .then((res) => {
      console.log("res: ", res);
      offLoading();
      // render danh sách chưa hoàn thành
      let unCompleted = res.data.filter((item) => {
        return item.check == false;
      });
      renderTaskList(unCompleted, "todo");

      // render danh sách đã hoàn thành
      let completed = res.data.filter((item) => {
        return item.check == true;
      });
      renderTaskList(completed, "completed");

      //  lấy các task từ data ra todoList
      res.data.forEach((item) => {
        todoList.push(item);
      });
    })
    .catch((err) => {
      console.log("err: ", err);
      offLoading();
    });
};
renderService();

// Thêm Task
let addItem = document.getElementById("addItem");

addItem.addEventListener("click", () => {
  onLoading();
  let dataForm = getForm();
  axios({
    url: `${BASE_URL}/todoList`,
    method: "POST",
    data: dataForm,
  })
    .then((res) => {
      console.log("res: ", res);
      offLoading();
      renderService();
    })
    .catch((err) => {
      console.log("err: ", err);
      offLoading();
    });
});

// Check task
let checkTask = (id) => {
  onLoading();
  let index = searchLocation(todoList, id);
  if (index != -1) {
    if (todoList[index].check == false) {
      todoList[index].check = true;
    } else {
      todoList[index].check = false;
    }
  }
  axios({
    url: `${BASE_URL}/todoList/${id}`,
    method: "PUT",
    data: todoList[index],
  })
    .then((res) => {
      console.log("res: ", res);
      offLoading();
      renderService();
    })
    .catch((err) => {
      console.log("err: ", err);
      offLoading();
    });
};

window.checkTask = checkTask;

// Xóa Task
let removeTask = (id) => {
  onLoading();
  axios({
    url: `${BASE_URL}/todoList/${id}`,
    method: "DELETE",
  })
    .then((res) => {
      console.log("res: ", res);
      offLoading();
      renderService();
    })
    .catch((err) => {
      console.log("err: ", err);
      offLoading();
    });
};
window.removeTask = removeTask;

// Sắp xếp từ A -> Z

let sortAtoZ = document.getElementById("two");
sortAtoZ.addEventListener("click", () => {
  onLoading();
  axios({
    url: `${BASE_URL}/todoList`,
    method: "GET",
  })
    .then((res) => {
      console.log("res: ", res);
      offLoading();
      // render danh sách chưa hoàn thành
      let unCompleted = res.data.filter((item) => {
        return item.check == false;
      });

      unCompleted.sort(function (a, b) {
        if (a.task.toLowerCase() < b.task.toLowerCase()) {
          return -1;
        }
        if (a.task.toLowerCase() > b.task.toLowerCase()) {
          return 1;
        }
        return 0;
      });
      renderTaskList(unCompleted, "todo");

      // render danh sách đã hoàn thành
      let completed = res.data.filter((item) => {
        return item.check == true;
      });

      completed.sort(function (a, b) {
        if (a.task.toLowerCase() < b.task.toLowerCase()) {
          return -1;
        }
        if (a.task.toLowerCase() > b.task.toLowerCase()) {
          return 1;
        }
        return 0;
      });
      renderTaskList(completed, "completed");
    })
    .catch((err) => {
      console.log("err: ", err);
      offLoading();
    });
});

// Sắp xếp từ Z -> A
let sortZtoA = document.getElementById("three");
sortZtoA.addEventListener("click", () => {
  onLoading();
  axios({
    url: `${BASE_URL}/todoList`,
    method: "GET",
  })
    .then((res) => {
      console.log("res: ", res);
      offLoading();
      // render danh sách chưa hoàn thành
      let unCompleted = res.data.filter((item) => {
        return item.check == false;
      });
      unCompleted.sort(function (a, b) {
        if (a.task.toLowerCase() < b.task.toLowerCase()) {
          return -1;
        }
        if (a.task.toLowerCase() > b.task.toLowerCase()) {
          return 1;
        }
        return 0;
      });
      unCompleted.reverse();
      renderTaskList(unCompleted, "todo");

      // render, sắp xếp danh sách đã hoàn thành
      let completed = res.data.filter((item) => {
        return item.check == true;
      });

      completed.sort(function (a, b) {
        if (a.task.toLowerCase() < b.task.toLowerCase()) {
          return -1;
        }
        if (a.task.toLowerCase() > b.task.toLowerCase()) {
          return 1;
        }
        return 0;
      });
      completed.reverse();
      renderTaskList(completed, "completed");
    })
    .catch((err) => {
      console.log("err: ", err);
      offLoading();
    });
});

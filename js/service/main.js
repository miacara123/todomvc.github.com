// 主要负责数据交互和数据处理、处理一些业务领域上的逻辑
// 业务逻辑的相关操作方法写这里
// 什么是业务逻辑, 就是处理数据的

(function (angular) {
	angular.module('app.service.main', [])
		.service('MainService', function ($window) {
			function getId() {
				var id = new Date().getTime();
				return id;
			}
			var todos = [];
			var storage = $window.localStorage;
			this.localSave = function () {
				console.log("本地保存一次");
				storage['myTodos'] = JSON.stringify(todos);
			};
			todos = storage['myTodos'] ? JSON.parse(storage['myTodos']) : [];
			this.getTodos = function () {
				return todos;
			};
			this.add = function (text) {
				var item = {};
				item.text = text;
				item.id = getId();
				item.isCompleted = false;
				todos.push(item);
				this.localSave();
			}
			this.rm = function (index) {
				todos.splice(index, 1);
				this.localSave();
			}
			this.clear = function () {
				var result = [];
				for (var i = 0; i < todos.length; i++) {
					// if ($scope.todos[i].isCompleted === true) {
					// 	$scope.todos.splice(i, 1);
					// }
					if (!todos[i].isCompleted) {
						result.push(todos[i]);
					}
				}
				todos = result;
				this.localSave();
				return todos;
			}
			this.count = function () {
				var i = 0;
				for (var item of todos) {
					if (item.isCompleted === false) {
						i++;
					}
				}
				return i;
			}
			var now = true;
			this.toggleAll = function () {
				if(this.count() === 0){
					now = false;
				}
				for (var item of todos) {
					item.isCompleted = now;
				}
				now = !now;
				this.localSave();
			}

		})
})(angular)

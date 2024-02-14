"use client";

import * as React from "react";

import Button from "@/components/Button";
import H1 from "@/components/H1";
import Modal from "@/components/Modal";
import TodoList from "@/layouts/TodoList";
import Info from "@/components/Info";

import { TodoContext } from "@/store/todo-context";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [modalType, setModalType] = React.useState("");
  const [todoId, setTodoId] = React.useState(0);
  const ref = React.useRef<HTMLDivElement>(null);
  const {todos, updatedTodo} = React.useContext(TodoContext);
  
  React.useEffect(() => {
    if(isModalOpen) {
      const handleESC = (event: KeyboardEvent) => {
        if(event.key === "Escape") {
          handleCloseModal();
        }
      }
      const mouseClickOutside = (event: MouseEvent) => {
        const element = ref.current;
        if(element && !element.contains(event.target as Node)) {
          handleCloseModal();
        }
      }
        document.addEventListener("keydown", handleESC);
        document.addEventListener("click", mouseClickOutside); 
      return () => {
        document.removeEventListener("keydown", handleESC);
        document.removeEventListener("click", mouseClickOutside);
      }
   } 
  }, [isModalOpen])

  const handleAddModal = () => {
    setModalType("AddModal");
    setIsModalOpen(true);
  }

  const handleCloseModal = () => {
    setModalType("");
    setIsModalOpen(false);
  }

  const handleEditModal = () => {
    setModalType("EditModal");
    setIsModalOpen(true);
  }

  const handleEditTodo = (id: number) => {
    handleEditModal();
    setTodoId(id)
  }

  const handleUpdatedInput = (name: string, description: string ) => {
    const updateName = name;
    const updateDescription = description;
    if(!updateName || !updateDescription) {
      return;
    }
    console.log("Updated Todo:", updateName, updateDescription);
    updatedTodo(todoId, updateName, updateDescription, new Date().toLocaleDateString());
  }

  return (
    <main className="w-full max-w-7xl mx-auto py-24">
      <section className="flex justify-between items-baseline">
        <H1 title={"Todo List App"} alignContent={"left"} className="mb-20"/>
        <Button title={"Add"} type={"button"} variant={"Add"} onClick={handleAddModal}/>
      </section>
      <TodoList todos={todos} OnEdit={handleEditTodo}/>
      {
        isModalOpen && modalType === "AddModal" &&
        <Modal isModalOpen={isModalOpen}>
          <Info reference={ref} infoTitle={"Add Todo"} onClose={handleCloseModal}/>
        </Modal> 
      }
      {
        isModalOpen && modalType === "EditModal" &&
        <Modal isModalOpen={isModalOpen}>
          <Info reference={ref} 
                infoTitle={"Edit Todo"} 
                onClose={handleCloseModal} 
                onEdit={handleUpdatedInput}
          />
        </Modal>
      }
    </main>
  );
}

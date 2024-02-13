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
  const [ModalType, setModalType] = React.useState("");
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
    setIsModalOpen(true);
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
  }

  const handleUpdatedTodo = (id: number) => {
    const name = todos.find(todo => todo.id === id)?.name || "";
    const description = todos.find(todo => todo.id === id)?.description || "" ; 
    const updateName = prompt("Update Name", name);
    const updateDescription = prompt("Update Description", description);
    if(!updateName || !updateDescription) {
      return;
    }
    updatedTodo(id, updateName as string, updateDescription as string, new Date().toLocaleDateString());
  }

  return (
    <main className="w-full max-w-7xl mx-auto py-24">
      <section className="flex justify-between items-baseline">
        <H1 title={"Todo List App"} alignContent={"left"} className="mb-20"/>
        <Button title={"Add"} type={"button"} variant={"Add"} onClick={handleAddModal}/>
      </section>
      <TodoList todos={todos} OnEdit={handleUpdatedTodo}/>
      {
        isModalOpen &&
        <Modal isModalOpen={isModalOpen}>
          <Info onClose={handleCloseModal} reference={ref} />
        </Modal> 
      }
    </main>
  );
}

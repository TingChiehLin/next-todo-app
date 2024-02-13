"use client";

import * as React from "react";

import Button from "@/components/Button";
import H1 from "@/components/H1";
import Modal from "@/components/Modal";
import TodoList from "@/layouts/TodoList";
import Info from "@/components/Info";

import { initialModalState, modalReducer } from "@/reducers/modalReducer";
import { TodoContext } from "@/store/todo-context";

export default function Home() {
  const [modalState, modaldispatch] = React.useReducer(modalReducer, initialModalState);
  const ref = React.useRef<HTMLDivElement>(null);
  const {todos} = React.useContext(TodoContext);
  
  const handleAddModal = () => {
    modaldispatch({
      type: "ADD_TODO_MODAL",
      payload: {
        title: "Add Todo",
        type: "ADD_TODO",
        isModalOpen: true,
      }
    })
  }

  const handleCloseModal = () => {
     modaldispatch({
      type: "CLOSE_MODAL",
      payload: false
     })
  }

  React.useEffect(() => {
    if(modalState.isModalOpen) {
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
  }, [modalState.isModalOpen])

  return (
    <main className="w-full max-w-7xl mx-auto py-24">
      <section className="flex justify-between items-baseline">
        <H1 title={"Todo List App"} alignContent={"left"} className="mb-20"/>
        <Button title={"Add"} type={"button"} variant={"Add"} onClick={handleAddModal}/>
      </section>
      <TodoList todos={todos} />
      {
        modalState.isModalOpen &&
        <Modal isModalOpen={modalState.isModalOpen}>
          <Info onClose={handleCloseModal} reference={ref}/>
        </Modal> 
      }
    </main>
  );
}

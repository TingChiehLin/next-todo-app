"use client";

import * as React from "react";

import Button from "@/components/Button";
import H1 from "@/components/H1";
import Modal from "@/components/Modal";
import TodoList from "@/layouts/TodoList";
import InfoCard from "@/components/Info";

import { TodoContext } from "@/store/todo-context";

export default function Home() {
  const [isOpen, setIsOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  const {todos} = React.useContext(TodoContext);
  
  const handleOpenModal = () => {
      setIsOpen(true);
  }

  const handleCloseModal = () => {
      setIsOpen(false);
  }

  React.useEffect(() => {
    if(isOpen) {
      const handleESC = (event: KeyboardEvent) => {
        if(event.key === "Escape") {
          setIsOpen(false);
        }
      }
      const mouseClickOutside = (event: MouseEvent) => {
        const element = ref.current;
        if(element && !element.contains(event.target as Node)) {
          setIsOpen(false);
        }
      }
        document.addEventListener("keydown", handleESC);
        document.addEventListener("click", mouseClickOutside); 
      return () => {
        document.removeEventListener("keydown", handleESC);
        document.removeEventListener("click", mouseClickOutside);
      }
   } 
  }, [isOpen])

  return (
    <main className="w-full max-w-7xl mx-auto py-24">
      <section className="flex justify-between items-baseline">
        <H1 title={"Todo List App"} alignContent={"left"} className="mb-20"/>
        <Button title={"Add"} type={"button"} variant={"Add"} onClick={handleOpenModal}/>
      </section>
      <TodoList todos={todos}/>
      {
        isOpen &&
        <Modal isOpen={isOpen}>
          <InfoCard onClose={handleCloseModal} reference={ref}/>
        </Modal> 
      }
    </main>
  );
}

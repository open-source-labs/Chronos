
export type TModal = {
  isOpen:boolean 
  type:string
}

export type TModalSetter = {
  setModal: React.Dispatch<React.SetStateAction<{
    isOpen: boolean;
    type: string;
}>>
}
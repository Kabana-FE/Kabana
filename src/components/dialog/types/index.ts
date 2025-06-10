export interface DialogProp extends React.PropsWithChildren {
  /**
   * 추가할 스타일들을 적어줍니다.
   */
  className?: string;
}

/**
 *
 * */
export interface DialogRootProp extends DialogProp {
  setToggleModal: () => void;
  toggleModal: boolean;
}

export interface DialogCloseProp {
  setToggleModal: () => void;
}

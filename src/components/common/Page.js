import React, { useEffect } from "react";

import Container from "./Container";

function Page(props) {
  useEffect(() => {
    document.title = `${props.title} | IRF | Community Matters`;
    window.scrollTo(0, 0);
  }, [props.title]);

  return (
    <Container title={props.title} schedule={props.schedule} clickHandler={props.clickHandler}>
      {props.children}
    </Container>
  );
}

export default Page;

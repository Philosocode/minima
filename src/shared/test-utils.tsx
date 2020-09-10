import React, { FC, ReactElement } from "react";
import { render as rtlRender, RenderOptions } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

function render(ui: ReactElement, renderOptions?: RenderOptions) {
  const Wrapper: FC = ({ children }) => {
    return (
      <MemoryRouter>
        {children}
      </MemoryRouter>
    );
  };
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
};

// re-export everything
export * from "@testing-library/react";

// override render method
export { render };

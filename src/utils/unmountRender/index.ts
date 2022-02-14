import { render, unmountComponentAtNode } from 'react-dom';

export const unmountRender = (element: React.ReactElement, container: Element) => {
  unmountComponentAtNode(container);
  render(element, container);
};

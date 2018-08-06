/**
 * @copyright 2009-2018 Vanilla Forums Inc.
 * @license https://opensource.org/licenses/GPL-2.0 GPL-2.0
 */

import React from "react";
import ReactDOM from "react-dom";
import debounce from "lodash/debounce";
import { onContent } from "@dashboard/application";

export function initCollapsableUserContent() {
    onContent(mountAllCollapsables);
}

function mountAllCollapsables() {
    console.log("Mount");
    const toggleClass = "js-toggleCollapsableContent";
    const toggles = document.querySelectorAll("." + toggleClass);
    toggles.forEach(toggle => {
        const id = toggle.getAttribute("aria-controls");
        if (id) {
            const content = document.querySelector(`[data-id="${id}"]`)!;
            const serverRenderedUserContent = content.innerHTML;
            ReactDOM.render(
                <CollapsableUserContent
                    id={id}
                    dangerouslySetInnerHTML={{ __html: serverRenderedUserContent }}
                    toggleButton={toggle as HTMLButtonElement}
                />,
                content,
            );
            toggle.classList.remove(toggleClass);
        }
    });
}

interface IProps {
    toggleButton: HTMLButtonElement;
    id: string;
    dangerouslySetInnerHTML: {
        __html: string;
    };
}

interface IState {
    isCollapsed: boolean;
}

export default class CollapsableUserContent extends React.PureComponent<IProps> {
    public state: IState = {
        isCollapsed: true,
    };

    private selfRef: React.RefObject<HTMLDivElement> = React.createRef();

    public render() {
        const style: React.CSSProperties = this.state.isCollapsed
            ? { maxHeight: this.maxHeight, overflow: "hidden" }
            : { maxHeight: this.maxHeight };

        return (
            <div
                className="collapsableContent"
                style={style}
                ref={this.selfRef}
                dangerouslySetInnerHTML={this.props.dangerouslySetInnerHTML}
            />
        );
    }

    public componentDidMount() {
        this.forceUpdate();
        if (this.selfRef.current!.children.length <= 1) {
            this.props.toggleButton.style.display = "none";
        }
        window.addEventListener("resize", () => debounce(() => this.forceUpdate(), 200)());

        this.props.toggleButton.addEventListener("click", () => {
            this.setState({ isCollapsed: !this.state.isCollapsed });
        });
    }

    private get maxHeight(): number | string {
        const self = this.selfRef.current;
        if (!self) {
            return "100%";
        }

        if (self.childElementCount <= 1) {
            return "100%";
        }

        if (this.state.isCollapsed) {
            return this.getElementHeight(self.children[0]) + this.getElementHeight(self.children[1]);
        } else {
            return self.scrollHeight;
        }
    }

    private getElementHeight(element: Element): number {
        const height = element.getBoundingClientRect().height;
        const { marginTop, marginBottom } = window.getComputedStyle(element);

        const topHeight = marginTop ? parseInt(marginTop, 10) : 0;
        const bottomHeight = marginBottom ? parseInt(marginBottom, 10) : 0;
        return height + topHeight + bottomHeight;
    }
}

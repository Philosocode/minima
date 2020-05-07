import React, { Component } from "react";

import { linkify } from "shared/helpers";

interface IProps {
  text: string;
  hoverUnderline?: boolean;
  showMoreLabel?: string;
  showLessLabel?: string;
}

interface IState {
  isExpanded: boolean;
  excerpt: string;
  fullText: string;
}

export class ToggleText extends Component<IProps, IState> {
  state = {
    isExpanded: false,
    excerpt: "",
    fullText: "",
  }

  componentDidMount() {
    const textWithAnchorTags = linkify(this.props.text);
    const excerpt = this.getExcerpt(textWithAnchorTags);

    this.setState({ 
      fullText: textWithAnchorTags,
      excerpt,
    });
  }

  getExcerpt = (fullText: string): string => {
    // Referenced: https://stackoverflow.com/a/4321178
    const splitDesc = fullText.split(/\r?\n/);
    const firstFewLines = splitDesc.slice(0, 5);

    return firstFewLines.join("\n");
  }

  getTextToShow = (): string => {
    return this.state.isExpanded
      ? this.state.fullText
      : this.state.excerpt;
  }

  getShowMoreToggle = () => {
    if (this.getExcerpt(this.state.fullText) === this.state.fullText) return;

    const text = this.state.isExpanded 
      ? this.props.showLessLabel ?? "SHOW LESS"
      : this.props.showMoreLabel ?? "SHOW MORE";
    
    let textClasses = "c-toggle-text__toggle c-link-text c-link-text--bold";
    if (this.props.hoverUnderline) textClasses += " c-link-text--hover-underline";

    return <div className={textClasses} onClick={this.toggleIsExpanded}>{ text }</div>
  }

  toggleIsExpanded = () => {
    this.setState(prevState => {
      return { isExpanded: !prevState.isExpanded };
    });
  }

  render() {
    return (
      <>
        <p className="c-toggle-text__text" dangerouslySetInnerHTML={{ __html: this.getTextToShow() }}></p>
        { this.getShowMoreToggle() }
      </>
    )
  }
}
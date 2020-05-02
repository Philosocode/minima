import React, { Component } from "react";

import { linkify } from "helpers/helpers";

interface IProps {
  text: string;
  containerClass?: string;
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
    const text = this.state.isExpanded 
      ? this.props.showLessLabel ?? "SHOW LESS"
      : this.props.showMoreLabel ?? "SHOW MORE";

    return <div className="c-link-text c-link-text--bold" onClick={this.toggleIsExpanded}>{ text }</div>
  }

  toggleIsExpanded = () => {
    this.setState(prevState => {
      return { isExpanded: !prevState.isExpanded };
    });
  }

  render() {
    return (
      <div className="c-toggle-text">
        <p className="c-toggle-text__text" dangerouslySetInnerHTML={{ __html: this.getTextToShow() }}></p>
        { this.getShowMoreToggle() }
      </div>
    )
  }
}
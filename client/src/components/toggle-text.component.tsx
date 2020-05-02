import React, { Component } from "react";

import { linkify } from "helpers/helpers";

interface IProps {
  text: string;
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
      ? "Show Less"
      : "Show More";

    return <div className="c-video__show-toggle" onClick={this.toggleIsExpanded}>{ text }</div>
  }

  toggleIsExpanded = () => {
    this.setState(prevState => {
      return { isExpanded: !prevState.isExpanded };
    });
  }

  render() {
    return (
      <>
        <p className="c-video__description" dangerouslySetInnerHTML={{ __html: this.getTextToShow() }}></p>
        { this.getShowMoreToggle() }
      </>
    )
  }
}
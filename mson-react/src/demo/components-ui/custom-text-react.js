import React from 'react';
import attach from '../../attach';
import Typography from '@material-ui/core/Typography';
import ReactMarkdown from 'react-markdown';

class ReactText extends React.PureComponent {
  render() {
    const { text } = this.props;

    // We use component=div to force usage of a div, instead of a p, as properly formatted HTML
    // cannot nest tags like h1 under a <p>.
    return (
      <Typography component="div">
        <ReactMarkdown source={text} />
        <div>And here we go</div>
      </Typography>
    );
  }
}

ReactText = attach(['text'])(ReactText);
export default ReactText;

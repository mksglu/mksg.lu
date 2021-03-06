import React from 'react';
import Layout from '../components/Layout';
import SEO from '../components/SEO';

class NotFoundPage extends React.Component {
  render() {
    return (
      <>
        <SEO notFound={true} />
        <Layout location={this.props.location}>
          <main>
            <h1>Not Found</h1>
            <p>I haven’t written this post yet. Will you help me write it?</p>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/6IJB0aD8gSA"
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <p>Too doo doo doo doo doo doo doo</p>
          </main>
        </Layout>
      </>
    );
  }
}

export default NotFoundPage;

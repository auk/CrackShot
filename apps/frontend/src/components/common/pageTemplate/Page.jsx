import React from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';

import './page.css';

const Page = (props) => {
  return (
    <DocumentTitle title={props.title}>
      <div className={`wrapper wrapper-content animated fadeInUp`}>
        {props.children}
      </div>
    </DocumentTitle>
  )
}

Page.propTypes = {
  title: PropTypes.string.isRequired,
}

const ContainerWrap = (props) => {
  return (
    <div className="row">
      {props.children}
    </div>
  )
}

const ContainerRow = ContainerWrap;

const Container = (props) => {
  return (
    <div className={props.size}>
      <div className="ibox float-e-margins">
        {props.children}
      </div>
    </div>
  )
}

Container.propTypes = {
  size: PropTypes.string,
}

Container.defaultProps = {
  size: 'col-md-12',
}

const Header = (props) => {
  return (
    <div className="ibox-title">
      {props.children}
    </div>
  )
}

const Tools = (props) => {
  return (
    <div className="ibox-tools">
      {props.children}
    </div>
  )
}

const Content = (props) => {
  return (
    <div className={`ibox-content ${props.loading ? 'sk-loading' : ''}`}>
      <div className="sk-spinner sk-spinner-three-bounce">
        <div className="sk-bounce1"></div>
        <div className="sk-bounce2"></div>
        <div className="sk-bounce3"></div>
      </div>
      {props.children}
    </div>
  )
}

Content.propTypes = {
  loading: PropTypes.bool.isRequired,
}

Content.defaultProps = {
  loading: false, 
}

const Footer = (props) => {
  return (
    <div className="ibox-footer">
      {props.children}
    </div>
  )
}

const Loading = (props) => {
  return (
    <div className="loader">
      <div className="inner one"></div>
      <div className="inner two"></div>
      <div className="inner three"></div>
    </div>
  )
}

const Error = (props) => {
  const { error } = props;

  return (
    <div>
      <br />
      <pre className="alert alert-danger">
        {error.message || error.status + (error.statusText ? ': ' + error.statusText : '')}
      </pre>
    </div>
  )
}

Error.propTypes = {
  error: PropTypes.object.isRequired,
}

const Dl = (props) => {
  return (
    <dl className="row mb-0 dl-horizontal">
      {props.children}
    </dl>
  );
}

const Dt = (props) => {
  return (
    // <dt>{props.children}</dt>
    <div className={"text-sm-right " + props.size}><dt>{props.children}</dt></div>
  );
}

Dt.propTypes = {
  size: PropTypes.string,
}

Dt.defaultProps = {
  size: 'col-sm-4',
}

const Dd = (props) => {
  return (
    // <dd class="mb-1">{props.children}</dd>
    <div className={"text-sm-left" + props.size}><dd class="mb-1">{props.children}</dd></div>
  );
}

Dt.propTypes = {
  size: PropTypes.string,
}

Dt.defaultProps = {
  size: 'col-sm-8',
}

Page.ContainerRow = ContainerRow;
Page.ContainerWrap = ContainerWrap;
Page.Container = Container;
Page.Header = Header;
Page.Tools = Tools;
Page.Content = Content;
Page.Error = Error;
Page.Footer = Footer;
Page.Loading = Loading;

Page.Dl = Dl;
Page.Dt = Dt;
Page.Dd = Dd;

export default Page;

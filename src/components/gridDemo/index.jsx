/* ------------------------------------------
 * Grid demo component
 *------------------------------------------- */
import React, { Component, PropTypes } from 'react'
import './style.scss'

/**
 * Grid demo :: display CSS classes used in grid system
 * @returns {XML}
 */
function gridDemo() {
  return (
    <div className="grid_demo">
      <div className="grid grid--wrap grid--pad">
        <div className="row">
          <h2>Grid definition</h2>
        </div>
        <div className="row">
          <div className="c-s-12 c-l-3">
            <div className="g-mod">
              <p>Small</p>
              <pre>.c-s-[1-12]</pre>
              <p>Offset small</p>
              <pre>.c-o-s-[1-12]</pre>
            </div>
          </div>
          <div className="c-s-12 c-l-3">
            <div className="g-mod">
              <p>Medium</p>
              <pre>.c-m-[1-12]</pre>
              <p>Offset medium</p>
              <pre>.c-o-m-[1-12]</pre>
            </div>
          </div>
          <div className="c-s-12 c-l-3">
            <div className="g-mod">
              <p>Large</p>
              <pre>.c-l-[1-12]</pre>
              <p>Offset large</p>
              <pre>.c-o-l-[1-12]</pre>
            </div>
          </div>
          <div className="c-s-12 c-l-3">
            <div className="g-mod">
              <p>X-large</p>
              <pre>.c-xl-[1-12]</pre>
              <p>Offset x-large</p>
              <pre>.c-o-xl-[1-12]</pre>
            </div>
          </div>
        </div>
        <div className="row">
          <h3>Full Width (with padding)</h3>
          <pre>.grid.grid--pad</pre>
        </div>
      </div>
      <div className="grid grid--pad">
        <div className="row">
          <div className="c-s-1">
            <div className="g-mod demo" />
          </div>
          <div className="c-s-11">
            <div className="g-mod demo" />
          </div>
        </div>
        <div className="row">
          <div className="c-s-2">
            <div className="g-mod demo" />
          </div>
          <div className="c-s-10">
            <div className="g-mod demo" />
          </div>
        </div>
        <div className="row">
          <div className="c-s-3">
            <div className="g-mod demo" />
          </div>
          <div className="c-s-9">
            <div className="g-mod demo" />
          </div>
        </div>
        <div className="row">
          <div className="c-s-4">
            <div className="g-mod demo" />
          </div>
          <div className="c-s-8">
            <div className="g-mod demo" />
          </div>
        </div>
        <div className="row">
          <div className="c-s-5">
            <div className="g-mod demo" />
          </div>
          <div className="c-s-7">
            <div className="g-mod demo" />
          </div>
        </div>
        <div className="row">
          <div className="c-s-6">
            <div className="g-mod demo" />
          </div>
          <div className="c-s-6">
            <div className="g-mod demo" />
          </div>
        </div>
        <div className="row">
          <div className="c-s-7">
            <div className="g-mod demo" />
          </div>
          <div className="c-s-5">
            <div className="g-mod demo" />
          </div>
        </div>
        <div className="row">
          <div className="c-s-8">
            <div className="g-mod demo" />
          </div>
          <div className="c-s-4">
            <div className="g-mod demo" />
          </div>
        </div>
        <div className="row">
          <div className="c-s-9">
            <div className="g-mod demo" />
          </div>
          <div className="c-s-3">
            <div className="g-mod demo" />
          </div>
        </div>
        <div className="row">
          <div className="c-s-10">
            <div className="g-mod demo" />
          </div>
          <div className="c-s-2">
            <div className="g-mod demo" />
          </div>
        </div>
        <div className="row">
          <div className="c-s-11">
            <div className="g-mod demo" />
          </div>
          <div className="c-s-1">
            <div className="g-mod demo" />
          </div>
        </div>
        <div className="row">
          <div className="c-s-12">
            <div className="g-mod demo" />
          </div>
        </div>
      </div>
      <div className="grid grid--pad grid--wrap">
        <div className="row">
          <h3>Wrapped Width (with padding)</h3>
          <pre>.grid.grid--wrap.grid--pad</pre>
        </div>
        <div className="row">
          <div className="c-s-1">
            <div className="g-mod demo" />
          </div>
          <div className="c-s-11">
            <div className="g-mod demo" />
          </div>
        </div>
        <div className="row">
          <div className="c-s-2">
            <div className="g-mod demo" />
          </div>
          <div className="c-s-10">
            <div className="g-mod demo" />
          </div>
        </div>
        <div className="row">
          <div className="c-s-3">
            <div className="g-mod demo" />
          </div>
          <div className="c-s-9">
            <div className="g-mod demo" />
          </div>
        </div>
        <div className="row">
          <div className="c-s-4">
            <div className="g-mod demo" />
          </div>
          <div className="c-s-8">
            <div className="g-mod demo" />
          </div>
        </div>
        <div className="row">
          <div className="c-s-5">
            <div className="g-mod demo" />
          </div>
          <div className="c-s-7">
            <div className="g-mod demo" />
          </div>
        </div>
        <div className="row">
          <div className="c-s-6">
            <div className="g-mod demo" />
          </div>
          <div className="c-s-6">
            <div className="g-mod demo" />
          </div>
        </div>
        <div className="row">
          <div className="c-s-7">
            <div className="g-mod demo" />
          </div>
          <div className="c-s-5">
            <div className="g-mod demo" />
          </div>
        </div>
        <div className="row">
          <div className="c-s-8">
            <div className="g-mod demo" />
          </div>
          <div className="c-s-4">
            <div className="g-mod demo" />
          </div>
        </div>
        <div className="row">
          <div className="c-s-9">
            <div className="g-mod demo" />
          </div>
          <div className="c-s-3">
            <div className="g-mod demo" />
          </div>
        </div>
        <div className="row">
          <div className="c-s-10">
            <div className="g-mod demo" />
          </div>
          <div className="c-s-2">
            <div className="g-mod demo" />
          </div>
        </div>
        <div className="row">
          <div className="c-s-11">
            <div className="g-mod demo" />
          </div>
          <div className="c-s-1">
            <div className="g-mod demo" />
          </div>
        </div>
        <div className="row">
          <div className="c-s-12">
            <div className="g-mod demo" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default gridDemo

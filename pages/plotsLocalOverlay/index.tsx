import { NextPage } from 'next'
import * as React from 'react'

import Head from 'next/head';
import { Main } from '../../plotsLocalOverlay/main';


const PlotsLocalOverlay: NextPage<any> = () => {
  return (
    <div>
      <Head>
        <script
          crossOrigin="anonymous"
          type="text/javascript"
          src="./jsroot-5.8.0/scripts/JSRootCore.js?2d&hist&more2d"
        ></script>
      </Head>
      <Main />
    </div>)
}



export default PlotsLocalOverlay
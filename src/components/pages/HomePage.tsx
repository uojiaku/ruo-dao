import 'twin.macro';
import * as React from 'react';
//import { usePublicNfts } from '../../services/historyService';
//import NftList from '../NftList';
import Page from '../utils/Page';
import mobiscroll from '@mobiscroll/react-lite';
export default function HomePage() {
 // const nfts = usePublicNfts();
 const [isOpen, setOpen] = React.useState(false);
 const [anchor, setAnchor] = React.useState(null);
 const onBtnClick = React.useCallback((args: { target: React.SetStateAction<null>; }) => {
  setAnchor(args.target);
  setOpen(true);
}, []);

  return (
  <Page tw="space-y-4">
      <div tw="space-y-2">
        <h1 tw="font-semibold text-2xl cursor-default">RUO DAO</h1>
        <h2 tw="opacity-60">
          Welcome to the Ruo DAO
        </h2>
      </div>
      {/* {!!nfts && <NftList items={nfts} />} */}
<mobiscroll.Page>
      <div className="mbsc-grid mbsc-grid-fixed">
                <div className="mbsc-form-group">
                    <div className="mbsc-row mbsc-justify-content-center">
                        <div className="mbsc-col-md-10 mbsc-col-xl-8 mbsc-form-grid">
                            <div className="mbsc-form-group-title">Build your Profile</div>
                            <div className="mbsc-row">
                                <div className="mbsc-col-md-6 mbsc-col-12">
                                    <mobiscroll.Input  type="text" placeholder="Email" inputStyle="box" labelStyle="floating" />
                                </div>
                                <div className="mbsc-col-md-6 mbsc-col-12">
                                    <mobiscroll.Input type="password" placeholder="Password" inputStyle="box" labelStyle="floating" />
                                </div>
                            </div>
                            <div className="mbsc-row">
                                <div className="mbsc-col-12">
                                    <mobiscroll.Input type="text" placeholder="State" inputStyle="box" labelStyle="floating" />
                                </div>
                            </div>
                            <div className="mbsc-row">
                                <div className="mbsc-col-md-6 mbsc-col-12">
                                    <mobiscroll.Input type="text" placeholder="Country" inputStyle="box" labelStyle="floating" />
                                </div>

                                <div className="mbsc-col-md-2 mbsc-col-6">
                                    <mobiscroll.Input type="text" placeholder="Zip" inputStyle="box" labelStyle="floating" />
                                </div>
                            </div>
                            <mobiscroll.Button style={{ border: '1px solid black'}} onClick={() => {onBtnClick}} >Sign in</mobiscroll.Button>
                        </div>
                    </div>
                </div>
            </div>
            </mobiscroll.Page>
      </Page>
  );
}



import Head from 'next/head'
import { Fragment, useState, useRef, useEffect } from "react";
import { Toaster } from 'react-hot-toast';
import { useWallet } from "@solana/wallet-adapter-react";
import useCandyMachine from '../hooks/use-candy-machine';
import Header from '../components/header';
import Footer from '../components/footer';
import useWalletBalance from '../hooks/use-wallet-balance';
import Countdown from 'react-countdown';
import usePresale from '../hooks/use-presale';
import toast from 'react-hot-toast';
import { useWindowSize } from '../hooks/use-window-size';

const Home = () => {
  const wallet = useWallet();
  const [balance] = useWalletBalance();
  const [isActive, setIsActive] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { isSoldOut, mintStartDate, isMinting, onMintNFT, nftsData } = useCandyMachine();
  const { isStatusLoading, mintStatus, currentHoldedCount, maxNFTHoldCount } = usePresale();
  const [imageIndex, setImageIndex] = useState(1);

  const {width, height} = useWindowSize();

  const mintRef = useRef(null);
  const aboutRef = useRef(null);
  const teamRef = useRef(null);
  const opsRef = useRef(null);

  useEffect(() => {
    const timer=setTimeout(() => {
      let index = (imageIndex + 1) % 10;
      if (index == 0) index = 1;
      if (index > 9) index = 9;
      setImageIndex(index);
    }, 200);
    return () => clearTimeout(timer);
  });

  return (
    <main>
      <Toaster />

      <Head>
        <title>Gorilla Galaxy</title>
        <meta name="description" content="You can purchase Gorilla." />
        <link rel="icon" href="/icon.png" />
      </Head>

      <Header mintRef={mintRef} aboutRef={aboutRef} teamRef={teamRef} opsRef={opsRef} />

      {(width > 768) ?
      <section>
        <div className="w-full md:h-screen flex justify-center items-end background-overview-section">
          <div>
            <h3 className="text-color-theme text-center overview-title drop-shadow-lg">GORILLA GALAXY</h3>
            <p className="text-white text-center overview-desc px-5 md:px-24">
              Genesis is a collection of 4444 unique, randomly generated Gorillas roaming on the Solana blockchain. 
              <br />
              <br />
              Every Genesis Gorilla is unique and programmatically generated from over 130+ possible attributes and traits like background, fur, clothes, mouth, head, earrings and eyes. Some gorillas will be rarer than others. 
              <br />
              <br />
              Owning a gorilla isn't just a cool picture. It is your ticket into our ecosystem, bringing you value in the real and digital world.
            </p>
          </div>
        </div>
      </section>
      :
      <section>
        <div className="w-full flex justify-center items-center">
          <img src={'/images/background.png'} width="100%" />
        </div>
        <div className="">
          <h3 className="text-color-theme text-center overview-title drop-shadow-lg">GORILLA GALAXY</h3>
          <p className="text-white text-center overview-desc px-5 md:px-24">
            Genesis is a collection of 4444 unique, randomly generated Gorillas roaming on the Solana blockchain. 
            <br />
            <br />
            Every Genesis Gorilla is unique and programmatically generated from over 130+ possible attributes and traits like background, fur, clothes, mouth, head, earrings and eyes. Some gorillas will be rarer than others. 
            <br />
            <br />
            Owning a gorilla isn't just a cool picture. It is your ticket into our ecosystem, bringing you value in the real and digital world.
          </p>
        </div>
      </section>
      }

      <section ref={mintRef}>
        <h3 className="text-white text-center presale-title drop-shadow-lg pb-10">PURCHASE GORILLA</h3>
        <div className="flex flex-row justify-center items-center space-x-10 px-5">
          <div className="flex flex-col justify-center items-center space-y-3">

            {!wallet.connected && <span
              className="text-gray-800 font-bold text-2xl cursor-default">
              PLEASE CLICK SELECT WALLET...
            </span>}

            {wallet.connected &&
              <>
                <p className="text-gray-800 font-bold text-lg cursor-default">Minted / Total: {nftsData.itemsRedeemed} / {nftsData.itemsAvailable}</p>
              </>
            }

            <div className="flex flex-col justify-start items-start">
              {wallet.connected &&
                <>
                  <input 
                    min={1}
                    max={10}
                    type="number" 
                    className="input-number"
                    onChange={(e) => setQuantity(Number(e.target.value))} 
                    style={{border: 'solid 1px grey', textAlign: 'center', width: '90%', margin: 5}} 
                    value={quantity} />

                  <button
                    disabled={isSoldOut || isMinting || !isActive}
                    onClick={() => onMintNFT(quantity)}
                    className="inline-block button-connect flex justify-center items-center mt-5"
                  >
                    {isSoldOut ? 
                        ("SOLD OUT") 
                      : isActive ?
                          isMinting ? 
                            <div className="loader"></div>
                          : 
                            <span>MINT {quantity}</span>
                        :
                        <Countdown
                          date={mintStartDate}
                          onMount={({ completed }) => completed && setIsActive(true)}
                          onComplete={() => setIsActive(true)}
                          renderer={renderCounter}
                        />
                    }
                  </button>
                </>
              }
            </div>
          </div>
          <div className="flex justify-center items-center border-2 border-green-600">
            <img src={`/images/art${imageIndex}.png`} width={200} />
          </div>
        </div>
      </section>
      
      <section ref={aboutRef}>
        <div className="w-full flex justify-center items-center relative px-5 md:px-10">
          <div className="flex flex-col md:flex-row justify-center items-center space-x-5">
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center">
              <h3 className="text-white text-center overview-title drop-shadow-lg">GORILLAS</h3>
              <div className="overview-desc-panel text-white p-5">
                KaijuKingz was spawned from the mind of CyberKongz holder and community member, OhDots, under his newly founded company: Augminted Labs. KaijuKingz hopes to expand its community with synergistic mechanics that foster competition and collaboration between Web3 communities. The collection will start with a mint of 3,333 Genesis Kaijuz, each granting its holder access to special perks and accesses. Genesis Kaijuz passively generate Radioactive Waste, which can be used to create Baby Kaijuz. Standing larger than life in a 69x69 pixel square, Kaijuz will have a wide variety of traits, types, and different aesthetics. Holding a Genesis Kaiju will reserve you a throne as a King of the Metaverse.
              </div>
            </div>
            <div className="w-full md:w-1/2 relative">
              <img src={'/images/overview.gif'} className="z-order-content" />
              <div className="remove-watermark z-order-top"></div>
            </div>
          </div>          
        </div>
      </section>

      <section ref={opsRef}>
        <h5 className="text-color-theme presale-title drop-shadow-lg text-center pb-10">Gorilla Ops</h5>
        <div className="w-full flex flex-col px-5 md:px-10 justify-center items-center">
          <div className="phase-panel w-full md:w-5/6">
            <div className="my-10">
              <h5 className="text-color-theme presale-desc mb-5">
                25% - GGG Giveaway
              </h5>
              <p className="text-white overview-desc">
                10x 5 SOL giveaway back to the minters of the collection.
              </p>
            </div>

            <div className="my-10">
              <h5 className="text-color-theme presale-desc mb-5">
                50% - Chimp Change
              </h5>
              <p className="text-white overview-desc">
                250 SOL is added to the community wallet. The community wallet will be used for various purposes decided by Gorilla Galaxy: Genesis holders. 
              </p>
            </div>

            <div className="my-10">
              <h5 className="text-color-theme presale-desc mb-5">
                75% - $GLUE
              </h5>
              <p className="text-white overview-desc">
                $GLUE token research and integration begins. This will be distributed to all Gorilla Galaxy: Genesis holders. Details TBA.
              </p>
            </div>

            <div className="my-10">
              <h5 className="text-color-theme presale-desc mb-5">
                100% - Enter the Gorillaverse
              </h5>
              <p className="text-white overview-desc">
                3D versions of all Genesis Gorillas will begin to roll out. These will be claimable with the $GLUE token.
              </p>
            </div>

            <div className="my-10">
              <p className="text-white overview-desc">
                <br />
                <br />
                We aim to have these models available for Solana metaverse integration when it is available.
                <br />
                <br />
                More to come with Gorilla Ops v2.0....
              </p>
            </div>
          </div>
        </div>
      </section>

      <section ref={teamRef}>
        <h3 className="text-white text-center overview-title drop-shadow-lg pb-10">GORILLA GALAXY TEAM</h3>
        <div className="w-full flex justify-center items-center">
          <div className="w-full md:w-5/6 grid grid-cols-1 md:grid-cols-3 gap-8 px-5 md:px-10">
            <div className="flex flex-col justify-center items-center">
              <img src={'/images/team1.png'} width={'80%'} />
              <div className="flex flex-row justify-center items-center space-x-4 mt-5">
                <h5 className="text-color-theme text-center presale-title">LEADER</h5>
                <a href="https://twitter.com/leader" target="_blank">
                  <img src={'/images/icon_twitter.png'} width={30} height={30} />
                </a>
              </div>
              <p className="text-white text-center overview-desc">LEAD DEVELOPERS</p>
            </div>

            <div className="flex flex-col justify-center items-center">
              <img src={'/images/team2.png'} width={'80%'} />
              <div className="flex flex-row justify-center items-center space-x-4 mt-5">
                <h5 className="text-color-theme text-center presale-title">ARTIST</h5>
                <a href="https://twitter.com/artist" target="_blank">
                  <img src={'/images/icon_twitter.png'} width={30} height={30} />
                </a>
              </div>
              <p className="text-white text-center overview-desc">ARTS CREATOR</p>
            </div>

            <div className="flex flex-col justify-center items-center">
              <img src={'/images/team3.png'} width={'80%'} />
              <div className="flex flex-row justify-center items-center space-x-4 mt-5">
                <h5 className="text-color-theme text-center presale-title">FUNDER</h5>
                <a href="https://twitter.com/funder" target="_blank">
                  <img src={'/images/icon_twitter.png'} width={30} height={30} />
                </a>
              </div>
              <p className="text-white text-center overview-desc">CO-FUNDER</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="w-full flex justify-center items-center px-5 md:px-10 mb-10">
          <div className="w-full md:w-2/3 flex flex-col justify-center items-center">
            <h3 className="text-color-theme text-center presale-title drop-shadow-lg">JOIN OUR COMMUNITY</h3>
            <div className="overview-desc-panel flex flex-col items-center justify-center p-10">
              <p className="text-white">The KaijuKingz creed is to create, protect, and rule together. We aim to help in the development of Web3 and other creatives, focusing on the NFT ecosystem in particular. We hope to deliver life changing scholarships and development grants through our KaijuKingz DAO; created first and foremost by and for the KaijuKingz community to enrich the Web3 and creative landscape. See how you can help, or even participate as a scholarship applicant.</p>
              <a href="https://discord.gg/gorilla" target="_blank">
                <button className="button-connect mt-10">JOIN OUR DISCORD</button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {(wallet.connected && (isStatusLoading || isMinting)) &&
        <div className="w-full h-full fixed block top-0 left-0 bg-black opacity-75 z-50 flex justify-center items-center">
          <div
            className="
              animate-spin
              rounded-full
              h-32
              w-32
              border-t-2 border-b-2 border-green-600
            "
          ></div>
        </div>
      }
    </main>
  );
};

const renderCounter = ({ days, hours, minutes, seconds }: any) => {
  return (
    <div className="panel-mint-timer">
      <span>
        <span className="text-timer-big">{days}</span> <span className="text-timer-small">Days</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
        <span className="text-timer-big">{hours}</span> <span className="text-timer-small">Hrs</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
        <span className="text-timer-big">{minutes}</span> <span className="text-timer-small">Min</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span className="text-timer-big">{seconds}</span> <span className="text-timer-small">Sec</span>
      </span>
    </div>
  );
};

export default Home;




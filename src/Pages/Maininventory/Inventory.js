import React from "react";
import BlackFooter from "../../Components/Footer/Footer";
import Gamesslider from "../../Components/Gamesslider/Gamesslider";
import InventorySlider from "../../Components/Inventoryslider/InventorySlider";
import Marketplace from "../../Components/Marketplaceslider/Marketplace";
import BlackNavbar from "../../Components/Navbar/Navbar";
import UploadSlider from "../../Components/UploaderimageSlider/UploadSlider";
import "./Inventory.css";
const Inventory = () => {
  return (
    <>
    <div style={{ background: "#101010" }}>
      <BlackNavbar />
      <div style={{ background: "#202125" }}>
        <div className="container inventory">
          <div className="row">
            <div className="col-12 py-2 py-md-4">
              <h3>Main Inventory</h3>
            </div>
          </div>
        </div>
      </div>
      <div className="py-2 py-md-4" style={{ background: "#191A1E" }}>
        <div className="container uploadfiles">
          <div className="row">
            <div className="col-12">
              <p>Upload Tools</p>
              <a href="#" className="float-end">
                View All
              </a>
            </div>
            <div className="col-4 col-md-3 py-3">
<div className="dashborder">
<input type="file" />
<i class="fas fa-plus plusicon"></i>
</div>
            </div>
            <div className="col-8 col-md-9">
                <UploadSlider />
            </div>
          </div>
        </div>
      </div>
      <div
        className="py-2 py-md-4 mt-2 mt-md-4"
        style={{ background: "#191A1E" }}
      >
        <div className="container uploadfiles">
          <div className="row">
            <div className="col-12">
              <p>Collection</p>
              <a href="#" className="float-end">
                View All
              </a>
            </div>
            <InventorySlider />
          </div>
        </div>
      </div>
      <div
        className="py-2 py-md-4 mt-2 mt-md-4"
        style={{ background: "#191A1E" }}
      >
        <div className="container uploadfiles">
          <div className="row">
            <div className="col-12">
              <p>Marketplace</p>
              <a href="#" className="float-end">
                View All
              </a>
            </div>
            <Marketplace />
            <Gamesslider />
            <div className="container">
                <div className="row px-3 px-md-0">
                    <p className="profileheading">Profile</p>
                <div className='main_profile align-self-center col-10'>
      <h3>Main Profile</h3>
    </div>
                </div>
            </div>
          
          </div>
        </div>
      </div>
    </div>
    <BlackFooter />
    </>
  );
};

export default Inventory;

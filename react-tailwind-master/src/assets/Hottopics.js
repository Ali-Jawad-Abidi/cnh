import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { AddBrand } from "./BrandsList";
import { useLocation } from "react-router-dom";

export const MuseumItem = (props) => {
  return (
    <a
      target="_blank"
      href={props.item.link}
      // style={{ textDecoration: "none", color: "white" }}
    >
      <div
        onClick={() => {
          localStorage.setItem("brand", JSON.stringify(props.brand._id));
        }}
        className="dark:bg-gray-700 rounded-lg shadow-lg flex flex-col gap-2 dark:text-white hover:scale-110 cursor-pointer bg-gray-200 my-2 p-2"
      >
        <img
          src={props.item.image}
          alt="brand image"
          className="rounded-lg object-cover w-full lg:h-36 h-24"
        />
        <div className="dark:text-white text-sm text-center font-bold">
          {props.item.name}
        </div>
      </div>
    </a>
  );
};
export function BrandItem(props) {
  return (
    <Link
      to={{
        pathname: `/nostalgiabase/${props.brand.name}`,
        search: `?type=${props.brand.type.toLowerCase()}&${props.brand.name}=${
          props.brand._id
        }`,
      }}
    >
      <div
        onClick={() => {
          localStorage.setItem("brand", JSON.stringify(props.brand._id));
        }}
        className="dark:bg-gray-700 rounded-lg shadow-lg flex flex-col gap-2 dark:text-white hover:scale-110 cursor-pointer bg-gray-200 my-2 p-2"
      >
        <img
          src={props.brand.image}
          alt="brand image"
          className="rounded-lg object-cover w-full lg:h-36 h-24"
        />
        <div className="dark:text-white text-sm text-center font-bold">
          {props.brand.name}
        </div>
        <div className="dark:text-white text-sm text-center">
          {props.brand.variations + " Variations"}
        </div>
      </div>
    </Link>
  );
}

export function SubCatItem(props) {
  const location = useLocation();
  var url = `${location.pathname}/${props.subcat.name}`;
  var search = `${location.search}&${props.subcat.name}=${props.subcat._id}`;
  return (
    <Link
      to={{
        pathname: url,
        search: search,
      }}
      style={{ textDecoration: "none", color: "black" }}
    >
      <div
        onClick={() => {
          localStorage.setItem("subcat", JSON.stringify(props.subcat._id));
        }}
        className="dark:bg-gray-700 rounded-lg shadow-lg flex flex-col gap-2 dark:text-white hover:scale-110 cursor-pointer bg-gray-200 my-2 p-2"
      >
        <img
          src={props.subcat.image}
          alt="brand image"
          className="rounded-lg object-cover w-full lg:h-36 h-24"
        />
        <div className="dark:text-white text-sm text-center font-bold hover:underline pb-2">
          {props.subcat.name}
        </div>
      </div>
    </Link>
  );
}

export function ConsoleItem(props) {
  const location = useLocation();
  var url = `${location.pathname}/${props.con.name}`;
  var search = `${location.search}&${props.con.name}=${props.con._id}`;
  return (
    <Link
      to={{
        pathname: url,
        search: search,
      }}
    >
      <div className="dark:bg-gray-700 rounded-lg shadow-lg flex flex-col gap-2 dark:text-white hover:scale-110 cursor-pointer bg-gray-200 my-2 p-2">
        <img
          src={props.con.images[0]}
          alt="brand image"
          className="rounded-lg object-cover w-full lg:h-64 h-full"
        />
        <div className="dark:text-white text-sm text-center font-bold hover:underline pb-2 capitalize">
          {props.con.name}
        </div>
      </div>
    </Link>
  );
}

export function BrandsGrid(props) {
  return (
    <div className="flex flex-col gap-2 min-w-full mb-2">
      <div className="dark:bg-gray-800 dark:text-white shadow-xl rounded-lg p-4">
        <span className="font-bold float-left text-xl dark:text-white">
          Consoles
        </span>
        <Grid container columnSpacing={1} rowSpacing={1}>
          {Array.from(props.consoles).map((brand, index) => (
            <Grid item xs={6} sm={6} md={3} key={index}>
              <BrandItem
                brand={brand}
                onRemove={props.onRemoveConsole}
                onChange={props.onChangeConsoles}
              />
            </Grid>
          ))}
        </Grid>
      </div>
      <div className="dark:bg-gray-800 dark:text-white shadow-xl rounded-lg p-4">
        <span className="font-bold float-left text-xl dark:text-white">
          Mobiles
        </span>
        <Grid container columnSpacing={1} rowSpacing={1}>
          {Array.from(props.mobiles).map((brand, index) => (
            <Grid item xs={6} sm={6} md={3} key={index}>
              <BrandItem
                brand={brand}
                onRemove={props.onRemoveMobile}
                onChange={props.onChangeMobile}
              />
            </Grid>
          ))}
        </Grid>
      </div>
      <div className="dark:bg-gray-800 dark:text-white shadow-xl rounded-lg p-4">
        <span className="font-bold float-left text-xl dark:text-white">
          PCs
        </span>
        <Grid container columnSpacing={1} rowSpacing={1}>
          {Array.from(props.pcs).map((brand, index) => (
            <Grid item xs={6} sm={6} md={3} key={index}>
              <BrandItem
                brand={brand}
                onRemove={props.onRemovePc}
                onChange={props.onChangePC}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}

export function SubCatsGrid(props) {
  var [subcats, setSubCats] = React.useState(props.subcats);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const type = searchParams.get("type");

  function onRemove(props) {
    var temp = subcats;
    temp = temp.filter((item) => {
      return item._id !== props;
    });
    setSubCats(temp);
  }
  function onAdd(props) {
    setSubCats((oldArray) => [...oldArray, props]);
  }
  function onChange(props) {
    var newState = subcats;
    newState.map((brand, index) => {
      if (brand._id === props.id) {
        brand.name = props.name;
        brand.image = props.image;
      }
    });
    setSubCats(newState);
  }
  return (
    <div className="dark:bg-gray-800 dark:text-white shadow-lg rounded-lg p-4 m-2">
      <div className="flex flex-row justify-between">
        <p className="font-bold text-left text-xl dark:text-white">
          Subcategories
        </p>
        {/* <AddSubcat brand={props.brand} /> */}
      </div>
      <Grid container columnSpacing={1} rowSpacing={1}>
        {subcats.map((subcat, index) => (
          <Grid item xs={6} sm={6} md={3} key={index}>
            <SubCatItem
              subcat={subcat}
              onRemove={onRemove}
              onChange={onChange}
              brand={props.brand}
              type={type}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default function Hottopics(props) {
  var [consoles, setConsoles] = React.useState(props.brands);
  var [pcs, setPcs] = React.useState(props.pcs);
  var [mobiles, setMobiles] = React.useState(props.mobiles);

  function removeConsole(props) {
    var temp = consoles;
    temp = temp.filter((item) => {
      return item._id !== props;
    });

    setConsoles(temp);
  }
  function removePc(props) {
    var temp = pcs;
    temp = temp.filter((item) => {
      return item._id !== props;
    });
    setPcs(temp);
  }
  function removeMobile(props) {
    var temp = mobiles;
    temp = temp.filter((item) => {
      return item._id !== props;
    });

    setMobiles(temp);
  }
  function addConsole(props) {
    setConsoles((oldArray) => [...oldArray, props]);
  }
  function addPc(props) {
    setPcs((oldArray) => [...oldArray, props]);
  }
  function addMobile(props) {
    setMobiles((oldArray) => [...oldArray, props]);
  }
  function onChangeConsoles(props) {
    var newState = consoles;
    newState.map((brand, index) => {
      if (brand._id === props.id) {
        brand.name = props.name;
        brand.image = props.image;
      }
    });
    setConsoles(newState);
  }
  function onChangePC(props) {
    var newState = pcs;
    newState.map((brand, index) => {
      if (brand._id === props.id) {
        brand.name = props.name;
        brand.image = props.image;
      }
    });
    setPcs(newState);
  }

  function onChangeMobile(props) {
    var newState = mobiles;
    newState.map((brand, index) => {
      if (brand._id === props.id) {
        brand.name = props.name;
        brand.image = props.image;
      }
    });
    setMobiles(newState);
  }

  return (
    <div>
      <div className="flex flex-row justify-between">
        <Typography align="left" gutterBottom variant="h5" component="div">
          {props.title}
        </Typography>
        <div className="flex flex-row justify-center gap-2">
          <div>
            <Link to={"/addconsole"} style={{ textDecoration: "none" }}>
              <button className="bg-blue-600 hover:bg-blue-700 rounded-lg text-white px-2 py-1">
                Add Console
              </button>
            </Link>
          </div>
          <div>
            <AddBrand />
          </div>
        </div>
      </div>
      <BrandsGrid
        consoles={consoles}
        mobiles={mobiles}
        pcs={pcs}
        onRemoveMobile={removeMobile}
        onRemovePc={removePc}
        onRemoveConsole={removeConsole}
        onAddMobile={addMobile}
        onAddPc={addPc}
        onAddConsole={addConsole}
        onChangeConsoles={onChangeConsoles}
        onChangeMobile={onChangeMobile}
        onChangePC={onChangePC}
      />
    </div>
  );
}

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import "package:firebase_auth/firebase_auth.dart";
import { useHistory, Link } from "react-router-dom";

import { auth, provider } from "../main.js";

function Header() {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.email);
  const name = useSelector((state) => state.name);
  const img = useSelector((state) => state.image);
  const history = useHistory();
  const [menuDrop, setMenuDrop] = useState(false);

  let [width, setWidth] = useState(window.innerWidth);
  let [height, setHeight] = useState(window.innerHeight);
  console.log(height);
  const rewe = () => {
    setWidth(window.innerWidth);
  };

  function rehe() {
    setHeight(window.innerHeight);
  }
  useEffect(() => {
    window.addEventListener("resize", rehe);
    window.addEventListener("resize", rewe);
  }, []);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        history.push("/home");
      }
    });
  }, [name]);

  const handleAuth = () => {
    if (!name) {
      auth
        .signInWithPopup(provider)
        .then((result) => {
          setUser(result.user);
          console.log(result);
          console.log(result.additionalUserInfo.profile.picture);
          console.log(result.user.photoURL);
        })
        .catch((error) => {
          alert(error.message);
        });
    } else if (name) {
      auth
        .signOut()
        .then(() => {
          dispatch({
            type: "LOGOUT",
          });
          history.push("/");
        })
        .catch((err) => alert(err.message));
    }
  };
  const setUser = (obj) => {
    dispatch({
      type: "LOGIN",
      name: obj.displayName,
      email: obj.email,
      image: obj.photoURL,
    });
  };

  return (
    <Nav>
      <Logo
        onClick={() => {
          alert(`${name} ${email} ${img}`);
        }}
      >
        <img src="/images/logo.svg" alt="Disney +" />
      </Logo>

      {!name ? (
        <Login onClick={handleAuth}>Log in</Login>
      ) : width >= 780 ? (
        <>
          <NavMenu>
            <Link to="/home" alt="home">
              <img src="/images/home-icon.svg" alt="home" />
              <span>Home</span>
            </Link>
            <Link to="/search" alt="search">
              <img src="/images/search-icon.svg" alt="search" />
              <span>Search</span>
            </Link>
            <Link to="/" alt="home">
              <img src="/images/watchlist-icon.svg" alt="home" />
              <span>WatchList</span>
            </Link>
            <Link to="/home" alt="home">
              <img src="/images/original-icon.svg" alt="home" />
              <span>Originals</span>
            </Link>
            <Link to="/home" alt="home">
              <img src="/images/movie-icon.svg" alt="home" />
              <span>Movies</span>
            </Link>
            <Link to="/home" alt="home">
              <img src="/images/series-icon.svg" alt="home" />
              <span>Series</span>
            </Link>
          </NavMenu>
          <SignOut>
            <UserImg src={img} alt="user image" />
            <DropDown>
              <span onClick={handleAuth}>Sign out</span>
            </DropDown>
          </SignOut>
        </>
      ) : (
        <>
          <MenuDropDown
            onClick={() => {
              setMenuDrop(!menuDrop);
            }}
          >
            {menuDrop ? (
              <DropDownList>
                <span>Menu list</span>
                <img src="/images/up-arrow.png" alt="dropdown" />
                <ul>
                  <li>
                    <Link to="/home" alt="home">
                      <img src="/images/home-icon.svg" alt="home" />
                      <span>Home</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/search" alt="search">
                      <img src="/images/search-icon.svg" alt="search" />
                      <span>Search</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/search" alt="search">
                      <img src="/images/search-icon.svg" alt="search" />
                      <span>Search</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/" alt="home">
                      <img src="/images/watchlist-icon.svg" alt="home" />
                      <span>WatchList</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/home" alt="home">
                      <img src="/images/original-icon.svg" alt="home" />
                      <span>Originals</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/home" alt="home">
                      <img src="/images/movie-icon.svg" alt="home" />
                      <span>Movies</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/home" alt="home">
                      <img src="/images/series-icon.svg" alt="home" />
                      <span>Series</span>
                    </Link>
                  </li>
                </ul>
              </DropDownList>
            ) : (
              <DropDownLook>
                <span>Menu list</span>
                <img src="/images/down-arrow.png" alt="dropdown" />
              </DropDownLook>
            )}
          </MenuDropDown>
          <SignOut>
            <UserImg src={img} alt="user image" />
            <DropDown>
              <span onClick={handleAuth}>Sign out</span>
            </DropDown>
          </SignOut>
        </>
      )}
    </Nav>
  );
}
const Nav = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: #090b13;
  display: flex;

  align-items: center;
  justify-content: space-between;
  padding: 0 36px;
  letter-spacing: 8px;
  z-index: 3;
`;
const Logo = styled.a`
  padding: 0;
  width: 80px;
  margin-top: 4px;
  margin-height: 70px;
  font-size: 0;
  display: inline-block;

  img {
    display: block;
    width: 100%;
  }
`;
const NavMenu = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  justify-content: flex-end;
  margin: 0px;
  padding: 0px;
  position: relative;
  margin-right: auto;
  margin-left: 25px;

  a {
    display: flex;
    align-items: center;
    padding: 0 12px;

    img {
      height: 20px;
      min-width: 20px;
      width: 20px;
      z-index: auto;
    }

    span {
      color: rgb(249, 249, 249);
      font-size: 13px;
      letter-spacing: 1.42px;
      line-height: 1.08;
      padding: 2px 0px;
      white-space: nowrap;
      position: relative;

      &:before {
        background-color: rgb(249, 249, 249);
        border-radius: 0px 0px 4px 4px;
        bottom: -6px;
        content: "";
        height: 2px;
        left: 0px;
        opacitity: 0;
        position: absolute;
        right: 0px;
        transform-origin: left center;
        transfrom: scaleX(0);
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
        visibility: hidden;
        width: auto;
      }
    }

    &:hover {
      span:before {
        transform: scaleX(1);
        visibility: visible;
        opacity: 1 !important;
      }
    }
  }
`;
const Login = styled.a`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px white solid;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease 0s;

  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
  }
`;
const UserImg = styled.img`
  height: 100%;
`;
const DropDown = styled.div`
  position: absolute;
  top: 48px;
  right: 0px;
  background-color: rgb(19, 19, 19);
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  box-shadow: rgba(0 0 0 / 50%) 0px 0px 18px 0px;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 3px;
  width: 100px;
  opacity: 0;
`;

const SignOut = styled.div`
  position:relative;
  display:flex
  height:48px;
  width:48px;
  cursor:pointer;
  align-items:center;
  justify-content:center;

  ${UserImg}{
    border-radius:50%;
    width:100%;
    height:100%;
  }
  
  &:hover{
    ${DropDown}{
      opacity:1;
      transition-duration: 1s;
    }
  }
`;
const MenuDropDown = styled.div`
  cursor: pointer;
  img {
    height: 20px;
    min-width: 20px;
    width: 20px;
    z-index: auto;
  }
`;
const DropDownList = styled.div`
  width: 300px;
  height: 600px;
  align-items: center;
  top: 0;
  margin: auto;
  padding: 20px;
  position: fixed;
  z-index: 4;
  margin-right: auto;
  margin-left: 25px;
  color: white;
  background: url("/images/home-background.png") center center / cover no-repeat
    fixed;

  ul {
    list-style-type: none;
    li {
      margin-top: 6px;
      a {
        display: flex;
        align-items: center;
        padding: 0 12px;
        img {
          height: 20px;
          min-width: 20px;
          width: 20px;
          z-index: auto;
        }

        span {
          color: rgb(249, 249, 249);
          font-size: 13px;
          letter-spacing: 1.42px;
          line-height: 1.08;
          padding: 2px 0px;
          white-space: nowrap;
          position: relative;

          &:before {
            background-color: rgb(249, 249, 249);
            border-radius: 0px 0px 4px 4px;
            bottom: -6px;
            content: "";
            height: 2px;
            left: 0px;
            opacitity: 0;
            position: absolute;
            right: 0px;
            transform-origin: left center;
            transfrom: scaleX(0);
            transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
            visibility: hidden;
            width: auto;
          }
        }
        &:hover {
          span:before {
            transform: scaleX(1);
            visibility: visible;
            opacity: 1 !important;
          }
        }
      }
    }
  }
`;
const DropDownLook = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  justify-content: flex-end;
  margin: 0px;
  padding: 0px;
  position: relative;
  margin-right: auto;
  margin-left: 25px;

  img {
    height: 20px;
    min-width: 20px;
    width: 20px;
    z-index: auto;
  }
`;
export default Header;

import React, { useState } from 'react';
import styles from './nav.module.css';
import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import HeadlessTippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';
import avatar from '../../assets/img/image1.png';
import user from '../../assets/img/Vector.png';
import { useSelector } from 'react-redux';
import { getAllCompareData } from 'features/compare/compareSlice';
const cx = classNames.bind(styles);

function NavBar({ host = false }) {
  const [account, setAccount] = useState(() => {
    const storageData = JSON.parse(localStorage.getItem('userData'));

    return storageData ?? false;
  });

  const navigate = useNavigate();

  const compareData = useSelector(getAllCompareData);

  const handleToCompare = () => {
    if (compareData.length > 0) {
      navigate('/compare');
    } else {
      alert('Please add at least 2 hotel to compare');
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem('wishlist');
    localStorage.removeItem('userData');
    setAccount([]);
    window.location.href = '/';
  };

  return (
    <header className={cx('header')}>
      <HeadlessTippy
        trigger="click"
        hideOnClick
        interactive
        placement="bottom-end"
        render={(attrs) => (
          <div className={cx('wrapper')}>
            <div className={cx('content')} tabIndex="-1" {...attrs}>
              <ul className={cx('sign-in-option')}>
                {!account ? (
                  <li className={cx('sign-in-list')}>
                    <Link to="/SignUp">Sign Up</Link>
                  </li>
                ) : (
                  <li className={cx('sign-in-list')}>
                    <Link to="/Account">Account</Link>
                  </li>
                )}
                {!account ? (
                  <li className={cx('sign-in-list')}>
                    <Link to="/Login">Login</Link>
                  </li>
                ) : (
                  <li className={cx('sign-in-list')} onClick={handleLogOut}>
                    Log Out
                  </li>
                )}
                <li className={cx('sign-in-list')}>Help center</li>
              </ul>
            </div>
          </div>
        )}
      >
        <img
          className={cx('user-avatar')}
          src={account ? avatar : user}
          alt="no img"
        />
      </HeadlessTippy>

      <Link to={host ? '/HostPage' : '/'}>
        <div className={cx('menu__relocate')}>
          <span>Relocate</span>
        </div>
      </Link>

      {!host && (
        <ul className={cx('menu-nav')}>
          <li className={cx('menu-nav__item')}>
            <Link
              to="/HomeBooking"
              state={{ searchValue: 'Ha Noi' }}
              className={cx('menu-nav__link')}
            >
              Find a Property
            </Link>
          </li>
          <li className={cx('menu-nav__item')} onClick={handleToCompare}>
            Compare
          </li>
          <li className={cx('menu-nav__item')}>
            <Link to="/Wishlists" className={cx('menu-nav__link')}>
              Wishlist
            </Link>
          </li>
          <li className={cx('menu-nav__item')}>
            <Link to="/ReservationStatus" className={cx('menu-nav__link')}>
              History
            </Link>
          </li>
          <HeadlessTippy
            trigger="click"
            hideOnClick
            interactive
            placement="bottom-end"
            render={(attrs) => (
              <div className={cx('wrapper', 'host')}>
                <div className={cx('content')} tabIndex="-1" {...attrs}>
                  <ul className={cx('sign-in-option')}>
                    <li className={cx('sign-in-list')}>
                      <Link to="/SignUpHost">Sign Up</Link>
                    </li>
                    <li
                      className={cx('sign-in-list')}
                      style={{ textAlign: 'start' }}
                    >
                      <Link to="/LoginHost">Login </Link>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          >
            <li className={cx('menu-nav__item')}>
              <div className={cx('menu-nav__link')}>For A Host</div>
            </li>
          </HeadlessTippy>
        </ul>
      )}
      {host && (
        <ul className={cx('menu-nav')}>
          <li className={cx('menu-nav__item')}>
            <Link to="/HostProperties" className={cx('menu-nav__link')}>
              List Properties
            </Link>
          </li>
          <li className={cx('menu-nav__item')}>
            <Link to="/HostReservation" className={cx('menu-nav__link')}>
              Reservations
            </Link>
          </li>

          <li className={cx('menu-nav__item')}>
            <Link to="/Dashboard" className={cx('menu-nav__link')}>
              Dashboard
            </Link>
          </li>

          <HeadlessTippy
            trigger="click"
            hideOnClick
            interactive
            placement="bottom-end"
            render={(attrs) => (
              <div className={cx('wrapper', 'host')}>
                <div className={cx('content')} tabIndex="-1" {...attrs}>
                  <ul className={cx('sign-in-option')}>
                    <li
                      className={cx('sign-in-list')}
                      style={{ textAlign: 'start' }}
                    >
                      <Link to="/Login">Login </Link>
                    </li>
                    <li
                      className={cx('sign-in-list')}
                      style={{ textAlign: 'start' }}
                    >
                      <Link to="/SignUp">Sign Up </Link>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          >
            <li className={cx('menu-nav__item')}>
              <div className={cx('menu-nav__link')}>For User</div>
            </li>
          </HeadlessTippy>
        </ul>
      )}
    </header>
  );
}

export default NavBar;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Heart,
  ShoppingBag,
  Pencil,
  Save,
  LogOut,
} from "lucide-react";

const DEFAULT_PROFILE = {
  name: "Cozy Friend",
  email: "hello@cozycorner.com",
  phone: "",
  address: "",
};

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(DEFAULT_PROFILE);
  const [form, setForm] = useState(DEFAULT_PROFILE);
  const [editing, setEditing] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const storedProfile =
      JSON.parse(localStorage.getItem("cozyProfile")) || DEFAULT_PROFILE;
    setProfile(storedProfile);
    setForm(storedProfile);

    const wishlistItems =
      JSON.parse(localStorage.getItem("wishlistItems")) || [];
    setWishlistCount(wishlistItems.length);

    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartCount(
      cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0),
    );
  }, []);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const saveProfile = () => {
    localStorage.setItem("cozyProfile", JSON.stringify(form));
    setProfile(form);
    setEditing(false);
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: "Profile updated",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const cancelEdit = () => {
    setForm(profile);
    setEditing(false);
  };

  const handleSignOut = () => {
    Swal.fire({
      title: "Sign out?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sign out",
      confirmButtonColor: "#5c2a4a",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "Signed out",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <div
      className="position-relative overflow-hidden px-3 px-md-5 py-5"
      style={{
        background:
          "linear-gradient(135deg, #fff7ed, #fce7f3, #f5f3ff)",
        minHeight: "80vh",
      }}
    >

      <div className="position-relative container" style={{ zIndex: 1 }}>
        <div className="mb-4">
          <span
            className="badge rounded-pill fw-semibold mb-2 px-3 py-2"
            style={{
              background: "#fbeee4",
              color: "#8a5a3f",
              letterSpacing: ".02em",
            }}
          >
            👤 Your account
          </span>
          <h1
            className="fw-bold mb-0"
            style={{
              color: "#5c2a4a",
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontSize: "clamp(2rem, 4vw, 2.8rem)",
            }}
          >
            Your Cozy Profile
          </h1>
        </div>

        <div className="row g-4">
          <div className="col-lg-4">
            <div
              className="p-4 rounded-4 text-center"
              style={{
                background: "#fdf3ea",
                border: "1px solid #f2e3d5",
                boxShadow: "0 10px 30px -18px rgba(92,42,74,0.35)",
              }}
            >
              <div
                className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                style={{
                  width: 84,
                  height: 84,
                  background: "#f3d9d2",
                  fontSize: 34,
                  fontWeight: 700,
                  color: "#8a5a3f",
                }}
              >
                {profile.name?.charAt(0).toUpperCase() || "C"}
              </div>
              <h5 className="fw-bold mb-1" style={{ color: "#3d2f28" }}>
                {profile.name}
              </h5>
              <p className="text-secondary small mb-3">{profile.email}</p>

              {!editing ? (
                <button
                  className="btn rounded-pill px-4 py-2 fw-semibold d-inline-flex align-items-center gap-2"
                  style={{
                    background: "#5c2a4a",
                    color: "#fff",
                    border: "none",
                  }}
                  onClick={() => setEditing(true)}
                >
                  <Pencil size={15} /> Edit Profile
                </button>
              ) : (
                <div className="d-flex gap-2 justify-content-center">
                  <button
                    className="btn rounded-pill px-3 py-2 fw-semibold d-inline-flex align-items-center gap-2"
                    style={{
                      background: "#5c2a4a",
                      color: "#fff",
                      border: "none",
                    }}
                    onClick={saveProfile}
                  >
                    <Save size={15} /> Save
                  </button>
                  <button
                    className="btn rounded-pill px-3 py-2 fw-semibold"
                    style={{
                      border: "1.5px solid #e7d9cf",
                      color: "#5c2a4a",
                      background: "#fff",
                    }}
                    onClick={cancelEdit}
                  >
                    Cancel
                  </button>
                </div>
              )}

              <hr style={{ borderColor: "#f0dfcf" }} className="my-4" />

              <button
                className="btn rounded-pill px-4 py-2 fw-semibold w-100 d-inline-flex align-items-center justify-content-center gap-2"
                style={{
                  background: "#fdeceb",
                  color: "#b3413a",
                  border: "none",
                }}
                onClick={handleSignOut}
              >
                <LogOut size={15} /> Sign Out
              </button>
            </div>
          </div>

          <div className="col-lg-8">
            <div className="row g-3 mb-4">
              <div className="col-6 col-md-4">
                <div
                  className="p-3 rounded-4 text-center h-100"
                  style={{
                    background: "#fff",
                    boxShadow: "0 10px 30px -18px rgba(92,42,74,0.35)",
                    cursor: "pointer",
                  }}
                  onClick={() => navigate("/wishlist")}
                >
                  <Heart
                    size={22}
                    style={{ color: "#c1897e" }}
                    className="mb-2"
                  />
                  <h5 className="fw-bold mb-0" style={{ color: "#3d2f28" }}>
                    {wishlistCount}
                  </h5>
                  <p className="small text-secondary mb-0">Wishlist items</p>
                </div>
              </div>
              <div className="col-6 col-md-4">
                <div
                  className="p-3 rounded-4 text-center h-100"
                  style={{
                    background: "#fff",
                    boxShadow: "0 10px 30px -18px rgba(92,42,74,0.35)",
                    cursor: "pointer",
                  }}
                  onClick={() => navigate("/cart")}
                >
                  <ShoppingBag
                    size={22}
                    style={{ color: "#c1897e" }}
                    className="mb-2"
                  />
                  <h5 className="fw-bold mb-0" style={{ color: "#3d2f28" }}>
                    {cartCount}
                  </h5>
                  <p className="small text-secondary mb-0">Items in cart</p>
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div
                  className="p-3 rounded-4 text-center h-100"
                  style={{
                    background: "#fff",
                    boxShadow: "0 10px 30px -18px rgba(92,42,74,0.35)",
                  }}
                >
                  <User
                    size={22}
                    style={{ color: "#c1897e" }}
                    className="mb-2"
                  />
                  <h5 className="fw-bold mb-0" style={{ color: "#3d2f28" }}>
                    0
                  </h5>
                  <p className="small text-secondary mb-0">Past orders</p>
                </div>
              </div>
            </div>

            <div
              className="p-4 rounded-4"
              style={{
                background: "#fff",
                boxShadow: "0 10px 30px -18px rgba(92,42,74,0.35)",
              }}
            >
              <h6
                className="fw-bold mb-3 text-uppercase small"
                style={{ color: "#8a5a3f", letterSpacing: ".05em" }}
              >
                Account Details
              </h6>

              <div className="row g-3">
                <div className="col-md-6">
                  <label
                    className="form-label small fw-semibold"
                    style={{ color: "#8a5a3f" }}
                  >
                    <User size={13} className="me-1" /> Full Name
                  </label>
                  <input
                    type="text"
                    className="form-control rounded-3"
                    value={form.name}
                    disabled={!editing}
                    onChange={handleChange("name")}
                    style={{
                      background: editing ? "#fff" : "#fdf3ea",
                      border: "1px solid #f2e3d5",
                    }}
                  />
                </div>
                <div className="col-md-6">
                  <label
                    className="form-label small fw-semibold"
                    style={{ color: "#8a5a3f" }}
                  >
                    <Mail size={13} className="me-1" /> Email
                  </label>
                  <input
                    type="email"
                    className="form-control rounded-3"
                    value={form.email}
                    disabled={!editing}
                    onChange={handleChange("email")}
                    style={{
                      background: editing ? "#fff" : "#fdf3ea",
                      border: "1px solid #f2e3d5",
                    }}
                  />
                </div>
                <div className="col-md-6">
                  <label
                    className="form-label small fw-semibold"
                    style={{ color: "#8a5a3f" }}
                  >
                    <Phone size={13} className="me-1" /> Phone
                  </label>
                  <input
                    type="text"
                    className="form-control rounded-3"
                    value={form.phone}
                    disabled={!editing}
                    onChange={handleChange("phone")}
                    placeholder="+977 ..."
                    style={{
                      background: editing ? "#fff" : "#fdf3ea",
                      border: "1px solid #f2e3d5",
                    }}
                  />
                </div>
                <div className="col-md-6">
                  <label
                    className="form-label small fw-semibold"
                    style={{ color: "#8a5a3f" }}
                  >
                    <MapPin size={13} className="me-1" /> Address
                  </label>
                  <input
                    type="text"
                    className="form-control rounded-3"
                    value={form.address}
                    disabled={!editing}
                    onChange={handleChange("address")}
                    placeholder="Your delivery address"
                    style={{
                      background: editing ? "#fff" : "#fdf3ea",
                      border: "1px solid #f2e3d5",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

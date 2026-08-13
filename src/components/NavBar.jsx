// import { NavLink } from "react-router-dom";
import SearchBar from "./SearchBar";
import { NavLink } from "react-router-dom";
import { styled } from "@mui/material/styles";
import HomeIcon from '@mui/icons-material/Home';
const categories = [
  "Fiction",
  "Mystery",
  "Thriller",
  "Romance",
  "Fantasy",
  "Morality",
  "Society",
  "Power",
  "Justice",
  "Adventure",
  "Tragedy",
  "War",
  "Philosophy",
];


export default function NavBar() {
  return (
    <nav style={{
      display: "flex",
      flex: "1",
      flexDirection: "row",
      padding: "8px",
      justifyContent: "space-around"
    }}>
      <SearchBar />
      <CategoryList categories={categories} />
    </nav>
  );
}

function Category({ category }) {
  return (
    <StyledNavLink className={({ isActive }) =>
      isActive ? "category active" : "category"
    }
      to={`/books/category/${category.toLowerCase()}`}>
      {category}
    </StyledNavLink>
  );
}


function CategoryList({ categories }) {
  return (
    <div className="category-list" style={{
      display: "flex",
      gap: "8px",
      justifyContent: "space-around"
    }}>
      {categories.map((category) => (
        <Category key={category} category={category} />
      ))}
    </div>);
}



const StyledNavLink = styled(NavLink)(({ theme }) => ({
  // Let it look like a normal MUI Link
  color: theme.palette.primary.main,
  textDecoration: "none",

  // Only change the active one
  "&.active": {
    color: theme.palette.primary.dark,
    fontWeight: 600,
    textDecoration: "underline"
  },
}));
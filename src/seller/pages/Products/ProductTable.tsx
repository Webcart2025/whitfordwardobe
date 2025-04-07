import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, IconButton, styled, TextField } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../Redux Toolkit/Store';
import { fetchSellerProducts, updateProduct, deleteProduct } from '../../../Redux Toolkit/Seller/sellerProductSlice';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Product } from '../../../types/productTypes';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function ProductTable() {
  const [editingProductId, setEditingProductId] = React.useState<number | null>(null);
  const [editedProduct, setEditedProduct] = React.useState<Product | null>(null);

  const sellerProduct = useAppSelector(state => state.sellerProduct);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) dispatch(fetchSellerProducts(token));
  }, [dispatch]);

  const editProduct = (product: Product) => {
    setEditingProductId(product.id ?? null);
    setEditedProduct({ ...product });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editedProduct) {
      const { name, value } = e.target;
      setEditedProduct({ ...editedProduct, [name]: value });
    }
  };

  const saveProduct = (productId: number | null) => {
    if (productId !== null && editedProduct) {
      dispatch(updateProduct({ productId, product: editedProduct }));
      setEditingProductId(null);
      setEditedProduct(null);
    }
  };

  const handleDeleteProduct = (productId: number | null) => {
    if (productId !== null) dispatch(deleteProduct(productId));
  };

  return (
    <>
      <h1 className="pb-5 font-bold text-xl">Products</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Images</StyledTableCell>
              <StyledTableCell align="right">Title</StyledTableCell>
              <StyledTableCell align="right">MRP</StyledTableCell>
              <StyledTableCell align="right">Selling Price</StyledTableCell>
              <StyledTableCell align="right">Color</StyledTableCell>
              <StyledTableCell align="right">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sellerProduct.products.map((item) => {
              const productId = item.id ?? null;
              return (
                <StyledTableRow key={productId}>
                  <StyledTableCell component="th" scope="row">
                    <img className="w-20 rounded-md" src={item.images?.[0] || ''} alt="Product" />
                  </StyledTableCell>

                  {/* Edit or Display Title */}
                  <StyledTableCell align="right">
                    {editingProductId === productId ? (
                      <TextField
                        name="title"
                        value={editedProduct?.title || ''}
                        onChange={handleChange}
                        placeholder="Title"
                      />
                    ) : (
                      item.title
                    )}
                  </StyledTableCell>

                  {/* Edit or Display MRP */}
                  <StyledTableCell align="right">
                    {editingProductId === productId ? (
                      <TextField
                        name="mrpPrice"
                        type="number"
                        value={editedProduct?.mrpPrice || ''}
                        onChange={handleChange}
                        placeholder="MRP"
                      />
                    ) : (
                      item.mrpPrice
                    )}
                  </StyledTableCell>

                  {/* Edit or Display Selling Price */}
                  <StyledTableCell align="right">
                    {editingProductId === productId ? (
                      <TextField
                        name="sellingPrice"
                        type="number"
                        value={editedProduct?.sellingPrice || ''}
                        onChange={handleChange}
                        placeholder="Selling Price"
                      />
                    ) : (
                      item.sellingPrice
                    )}
                  </StyledTableCell>

                  {/* Edit or Display Color */}
                  <StyledTableCell align="right">
                    {editingProductId === productId ? (
                      <TextField
                        name="color"
                        value={editedProduct?.color || ''}
                        onChange={handleChange}
                        placeholder="Color"
                      />
                    ) : (
                      item.color
                    )}
                  </StyledTableCell>

                  {/* Edit/Save/Cancel and Delete Actions */}
                  <StyledTableCell align="right">
                    {editingProductId === productId ? (
                      <>
                        <Button onClick={() => saveProduct(productId)} color="primary">
                          Save
                        </Button>
                        <Button onClick={() => setEditingProductId(null)} color="secondary">
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <IconButton onClick={() => editProduct(item)} color="primary">
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDeleteProduct(productId)} color="error">
                          <DeleteIcon />
                        </IconButton>
                      </>
                    )}
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

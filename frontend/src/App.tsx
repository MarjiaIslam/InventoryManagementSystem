import { useEffect, useState } from 'react';
import './App.css';

interface Product {
  id?: number;
  name: string;
  category: string;
  quantity: number;
  price: number;
}

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<Product>({ name: '', category: '', quantity: 0, price: 0.0 });
  const [editingId, setEditingId] = useState<number | null>(null);
  
  // New State: Controls 'list' or 'card' view. Default is 'list'.
  const [viewMode, setViewMode] = useState<'list' | 'card'>('list');

  const API = "/api/products";

  useEffect(() => { fetchProducts(); }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch(API);
      if (res.ok) setProducts(await res.json());
    } catch(e) { console.error(e); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `${API}/${editingId}` : API;

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });

    setForm({ name: '', category: '', quantity: 0, price: 0 });
    setEditingId(null);
    fetchProducts();
  };

  const handleDelete = async (id: number) => {
    if(!confirm("Are you sure you want to delete this item?")) return;
    await fetch(`${API}/${id}`, { method: 'DELETE' });
    fetchProducts();
  };

  const handleEdit = (p: Product) => {
    setForm(p);
    setEditingId(p.id!);
    // Optional: scroll to top when editing
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container">
      <h1>Inventory Management System</h1>
      
      {/* Input Form */}
      <form onSubmit={handleSubmit} className="form-card">
        <input 
          placeholder="Product Name *" 
          value={form.name} 
          onChange={e => setForm({...form, name: e.target.value})} 
          required 
        />
        <input 
          placeholder="Category (Optional)" 
          value={form.category} 
          onChange={e => setForm({...form, category: e.target.value})} 
        />
        <input 
          type="number" 
          placeholder="Qty *" 
          value={form.quantity || ''} 
          onChange={e => setForm({...form, quantity: Number(e.target.value)})} 
          required 
        />
        <input 
          type="number" 
          step="0.01" 
          placeholder="Price ($) *" 
          value={form.price || ''} 
          onChange={e => setForm({...form, price: Number(e.target.value)})} 
          required 
        />
        <button type="submit" className="btn-main">
          {editingId ? 'Update' : 'Add New'}
        </button>
      </form>

      {/* View Toggle Buttons */}
      <div className="view-toggles">
        <button 
          className={`btn-toggle ${viewMode === 'list' ? 'active' : ''}`}
          onClick={() => setViewMode('list')}
        >
          📋 List View
        </button>
        <button 
          className={`btn-toggle ${viewMode === 'card' ? 'active' : ''}`}
          onClick={() => setViewMode('card')}
        >
          📦 Card View
        </button>
      </div>

      {/* CONDITIONAL RENDERING */}
      {viewMode === 'list' ? (
        // --- LIST VIEW ---
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr><td colSpan={5} style={{textAlign: 'center'}}>No items found.</td></tr>
              ) : products.map(p => (
                <tr key={p.id}>
                  <td style={{fontWeight: 'bold'}}>{p.name}</td>
                  <td>
                    {p.category ? <span className="category-badge">{p.category}</span> : <span style={{color:'#ccc'}}>-</span>}
                  </td>
                  <td>{p.quantity}</td>
                  <td>${p.price.toFixed(2)}</td>
                  <td className="action-cell">
                    <button onClick={() => handleEdit(p)} className="btn-edit">Edit</button>
                    <button onClick={() => handleDelete(p.id!)} className="btn-delete">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        // --- CARD VIEW ---
        <div className="grid">
          {products.map(p => (
            <div key={p.id} className="card">
              <h3>{p.name}</h3>
              {p.category && <span className="category-badge">{p.category}</span>}
              <div className="details">
                <span>Qty: {p.quantity}</span>
                <span>${p.price.toFixed(2)}</span>
              </div>
              <div className="action-cell" style={{marginTop: 'auto'}}>
                <button onClick={() => handleEdit(p)} className="btn-edit" style={{flex:1}}>Edit</button>
                <button onClick={() => handleDelete(p.id!)} className="btn-delete" style={{flex:1}}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
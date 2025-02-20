function PantryPackSelector({ pantryPacks, setSelectedPack }) {
    return (
      <select onChange={(e) => setSelectedPack(pantryPacks.find(pack => pack.name === e.target.value))}>
        <option value="">-- Choose a Pack --</option>
        {pantryPacks.map(pack => (
          <option key={pack.name} value={pack.name}>{pack.name}</option>
        ))}
      </select>
    );
  }
  
  export default PantryPackSelector;
  
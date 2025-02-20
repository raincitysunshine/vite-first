export default function PantryPackContainer({ selectedPack }) {
    return (
      <article className="pantry-pack">
        <h3>{selectedPack.name}</h3>
        <ul>
          {selectedPack.items.map((ingredient) => (
            <li key={ingredient}>{ingredient}</li>
          ))}
        </ul>
      </article>
    );
  }
  
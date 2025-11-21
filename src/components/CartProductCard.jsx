const CartProductCard = ({
  image,
  name,
  price,
  quantity,
  options = [],
  onIncrement,
  onDecrement,
  onEdit,
  onRemove,
}) => {
  return (
    <div className="w-full bg-white border border-neutral-200 rounded-2xl p-4 flex gap-4 shadow-sm hover:shadow-md transition-all duration-300">

      {/* --- Product Image --- */}
      <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* --- Product Info --- */}
      <div className="flex flex-col justify-between grow">

        {/* Title + Edit */}
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-neutral-900 leading-tight">
              {name}
            </h3>

            {/* Options / Selections */}
            <div className="text-xs text-neutral-600 mt-1 space-y-0.5">
              {options.map((opt, i) => (
                <p key={i}>
                  <span className="font-medium text-neutral-700">{opt.label}:</span>{" "}
                  {opt.value}
                </p>
              ))}
            </div>
          </div>

          {/* Edit Button */}
          <button
            onClick={onEdit}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium px-2 py-1 rounded-lg"
          >
            Edit
          </button>
        </div>

        {/* Bottom Row */}
        <div className="flex justify-between items-center mt-3">

          {/* Quantity Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={onDecrement}
              className="w-8 h-8 flex items-center justify-center rounded-full border border-neutral-300 text-neutral-700 hover:bg-neutral-100"
            >
              -
            </button>

            <span className="w-8 text-center font-medium text-neutral-900">
              {quantity}
            </span>

            <button
              onClick={onIncrement}
              className="w-8 h-8 flex items-center justify-center rounded-full border border-neutral-300 text-neutral-700 hover:bg-neutral-100"
            >
              +
            </button>
          </div>

          {/* Price */}
          <span className="text-lg font-semibold text-neutral-900">
            Rs. {price}
          </span>
        </div>
      </div>

      {/* Remove Button */}
      {onRemove && (
        <button
          onClick={onRemove}
          className="text-neutral-400 hover:text-red-500 transition-colors"
        >
          ✕
        </button>
      )}

    </div>
  );
};

export default CartProductCard;

module.exports = (bytes, useBytes = false, decimals = 2) => {
   if (!+bytes)
      return `0 ${useBytes ? `bits` : `bytes`}`;

   const k = useBytes
      ? 1024
      : 1000;

   const dm = decimals < 0
      ? 0
      : decimals;

   const sizes = useBytes
      ? [ `bytes`, `KiB`, `MiB`, `GiB`, `TiB`, `PiB`, `EiB`, `ZiB`, `YiB` ]
      : [ `bytes`, `KB`,  `MB`,  `GB`,  `TB`,  `PB`,  `EB`,  `ZB`,  `YB`  ];

   const i = Math.floor(Math.log(bytes) / Math.log(k));

   return `${parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`;
};
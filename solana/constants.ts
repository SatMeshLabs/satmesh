/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/satmesh.json`.
 */
export type Satmesh = {
  "address": "9NDusP73MVbsD2tt8RFEP83jBRwXw3aw37PkeeCRbFxs",
  "metadata": {
    "name": "satmesh",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "fetchData",
      "discriminator": [
        166,
        83,
        157,
        174,
        116,
        105,
        133,
        4
      ],
      "accounts": [
        {
          "name": "dataAccount",
          "writable": true
        }
      ],
      "args": [
        {
          "name": "id",
          "type": "string"
        }
      ]
    },
    {
      "name": "initializeData",
      "discriminator": [
        179,
        127,
        115,
        220,
        243,
        12,
        29,
        184
      ],
      "accounts": [
        {
          "name": "dataAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  97,
                  116,
                  95,
                  109,
                  101,
                  115,
                  104
                ]
              },
              {
                "kind": "account",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "id",
          "type": "string"
        },
        {
          "name": "value",
          "type": "string"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "dataAccount",
      "discriminator": [
        85,
        240,
        182,
        158,
        76,
        7,
        18,
        233
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "idAlreadyExists",
      "msg": "The data with the specified ID already exists."
    },
    {
      "code": 6001,
      "name": "dataNotFound",
      "msg": "The data with the specified ID was not found."
    }
  ],
  "types": [
    {
      "name": "dataAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "entries",
            "type": {
              "vec": {
                "defined": {
                  "name": "dataEntry"
                }
              }
            }
          }
        ]
      }
    },
    {
      "name": "dataEntry",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "id",
            "type": "string"
          },
          {
            "name": "value",
            "type": "string"
          }
        ]
      }
    }
  ]
};

export const IDL =
{
  "address": "9NDusP73MVbsD2tt8RFEP83jBRwXw3aw37PkeeCRbFxs",
  "metadata": {
    "name": "satmesh",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "fetch_data",
      "discriminator": [
        166,
        83,
        157,
        174,
        116,
        105,
        133,
        4
      ],
      "accounts": [
        {
          "name": "data_account",
          "writable": true
        }
      ],
      "args": [
        {
          "name": "id",
          "type": "string"
        }
      ]
    },
    {
      "name": "initialize_data",
      "discriminator": [
        179,
        127,
        115,
        220,
        243,
        12,
        29,
        184
      ],
      "accounts": [
        {
          "name": "data_account",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  97,
                  116,
                  95,
                  109,
                  101,
                  115,
                  104
                ]
              },
              {
                "kind": "account",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "system_program",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "id",
          "type": "string"
        },
        {
          "name": "value",
          "type": "string"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "DataAccount",
      "discriminator": [
        85,
        240,
        182,
        158,
        76,
        7,
        18,
        233
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "IdAlreadyExists",
      "msg": "The data with the specified ID already exists."
    },
    {
      "code": 6001,
      "name": "DataNotFound",
      "msg": "The data with the specified ID was not found."
    }
  ],
  "types": [
    {
      "name": "DataAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "entries",
            "type": {
              "vec": {
                "defined": {
                  "name": "DataEntry"
                }
              }
            }
          }
        ]
      }
    },
    {
      "name": "DataEntry",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "id",
            "type": "string"
          },
          {
            "name": "value",
            "type": "string"
          }
        ]
      }
    }
  ]
}
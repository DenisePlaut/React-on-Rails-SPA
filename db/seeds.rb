user_attributes = [
  {
    name: 'Chief',
    email: 'chief@dogs.com',
    password: 'chiefpassword',
    password_confirmation: 'chiefpassword',
    role: 'admin'
  },
  {
    name: 'Dakota',
    email: 'dakota@dogs.com',
    password: 'dakotapassword',
    password_confirmation: 'dakotapassword',
    role: 'user'
  },
  {
    name: 'Chester',
    email: 'chester@dogs.com',
    password: 'chesterpassword',
    password_confirmation: 'chesterpassword',
    role: 'user'
  }
]

user_attributes.each do |attributes|
  User.create(attributes)
end

post_attributes = [
  {
    image_url: "https://4dogday.files.wordpress.com/2013/08/tired-dog.jpg",
    comment: "It's been a ruff day 😴",
    user_id: 3
  },
  {
    image_url: "https://media.mnn.com/assets/images/2014/12/gray-squirrel-uc-berkeley.jpg.653x0_q80_crop-smart.jpg",
    comment: "Squirrel! 🐿🐿🐿",
    user_id: 2
  },
  {
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNGmwK3Qoi4CiBvfB7giQopJwd01K2QoGlIZ9eLSR2nElTXRoo",
    comment: "Thanks fur the heads-up! 🤗",
    user_id: 1
  },
]

post_attributes.each do |attributes|
  Post.create(attributes)
end

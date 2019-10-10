<?php

use Faker\Generator as Faker;

$factory->define(\App\Project::class, function (Faker $faker) {
    return [
        'title' => $faker->word,
        'content' => $faker->sentence('120'),
       /* 'user_id' => function(){
            return factory(\App\User::class)->create()->id;
        }*/
    ];
});

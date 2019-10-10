<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(UsersTableSeeder::class);
        factory(\App\User::class,5)->create()
            ->each(function($user){
                  $user->projects()->save(factory(\App\Project::class)->make());
                  //$user->projects()->saveMany(factory(\App\Project::class,4)->make());
            });

    }
}

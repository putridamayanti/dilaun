<?php

namespace Database\Seeders;

use App\Models\User;
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
        // \App\Models\User::factory(10)->create();

        $user           = new User();
        $user->name     = 'Admin';
        $user->username = 'dilaunadmin';
        $user->email    = 'admin@dilaun.com';
        $user->password = bcrypt('dilaunadmin');
        $user->role     = 'Admin';
        $user->save();
    }
}

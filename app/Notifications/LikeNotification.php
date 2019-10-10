<?php

namespace App\Notifications;

use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Log;

class LikeNotification extends Notification
{
    private $project;
    use Queueable;

    /**
     * Create a new notification instance.
     *
     * @param $project
     */
    public function __construct($project)
    {
        $this->project = $project;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['broadcast','database'];
    }



    public function toBroadcast($notifiable)
    {

       return new BroadcastMessage([
            'title' => 'New liked',
            'content' => auth()->user()->name . " liked your project ({$this->project->title})",
            'date' => Carbon::now()
        ]);
    }

    public function toDatabase($notifiable) {
        return [
            'title' => 'New liked',
            'content' => auth()->user()->name . " liked your project ({$this->project->title})",
            'date' => Carbon::now()
        ];
    }

}
